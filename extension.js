'use strict';

var app = require('express')();

module.exports = function(nodecg) {
    app.post('/toth3-overlay/donation', function(req, res){
        console.log(req.body);
        nodecg.sendMessage('donation', req.body.content);
        res.end();
    });

    nodecg.mount(app);

    /*
     * Lowerthird
     */
    var lowerthirdShowing = nodecg.Replicant('lowerthirdShowing', { defaultValue: false, persistent: false });
    var lowerthirdPulsing = nodecg.Replicant('lowerthirdPulsing', { defaultValue: false, persistent: false });
    nodecg.Replicant('texts', { defaultValue: {}, persistent: false });

    nodecg.listenFor('pulse', function pulse(duration) {
        // Don't stack pulses
        if (lowerthirdPulsing.value) return;

        lowerthirdShowing.value = true;
        lowerthirdPulsing.value = true;

        // End pulse after "duration" seconds
        setTimeout(function() {
            lowerthirdShowing.value = false;
            lowerthirdPulsing.value = false;
        }, duration * 1000);
    });

    /*
     function getAggregate() {
     $.getJSON('http://tipofthehats.org/tracker?jsonp=?', null, function(data) {
     $('#IR_TOTAL').html(data.agg.amount.formatMoney());
     $('#IR_NUM_OF_CONTRIBUTIONS').html(data.agg.count);
     });
     }
     */
};
