'use strict';

var DONATION_STATS_URL = 'http://tracker.tipofthehats.org/2?json';
var POLL_INTERVAL = 3 * 60 * 1000;
var util = require('util');
var Q = require('q');
var request = require('request');
var nodecg = null;

module.exports = function (extensionApi) {
    nodecg = extensionApi;
    var total = nodecg.Replicant('total', {defaultValue: '$0'});

    nodecg.declareSyncedVar({
        name: 'totalAutoUpdate',
        initialVal: true,
        setter: function(newVal) {
            if (newVal) {
                nodecg.log.info('Automatic updating of donation total enabled');
                updateTotal(true);
            } else {
                nodecg.log.warn('Automatic updating of donation total DISABLED');
                clearInterval(updateInterval);
            }
        }
    });

    // Get initial data
    update();

    // Get latest prize data every POLL_INTERVAL milliseconds
    nodecg.log.info('Polling donation total every %d seconds...', POLL_INTERVAL / 1000);
    var updateInterval = setInterval(update, POLL_INTERVAL);

    // Dashboard can invoke manual updates
    nodecg.listenFor('updateTotal', updateTotal);

    function updateTotal(silent, cb) {
        if (!silent) nodecg.log.info("Manual donation total update button pressed, invoking update...");
        clearInterval(updateInterval);
        updateInterval = setInterval(update, POLL_INTERVAL);
        update()
            .then(function (updated) {
                cb(null, updated);
            }, function (error) {
                cb(error);
            });
    }
};

function update() {
    var deferred = Q.defer();
    request(DONATION_STATS_URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var stats = JSON.parse(body);
            var total = parseFloat(stats.agg.amount || 0);

            if (total !== nodecg.variables.total) {
                nodecg.variables.total = total;
                nodecg.log.info('Updated total:', total);
                deferred.resolve(true);
            } else {
                nodecg.log.info('Total unchanged:', total);
                deferred.resolve(false);
            }
        } else {
            var msg = '';
            if (error) msg = util.format('Could not get donation total:', error.message);
            else if (response) msg = util.format('Could not get donation total, response code %d', response.statusCode);
            else msg = util.format('Could not get donation total, unknown error');
            nodecg.log.error(msg);
            deferred.reject(msg);
        }
    });
    return deferred.promise;
}
