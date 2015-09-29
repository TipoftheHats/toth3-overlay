'use strict';


var LastFmNode = require('lastfm').LastFmNode;

/* jshint -W106 */
// Put your Last.fm api key and secret here
var lastfm = new LastFmNode({
    api_key: '',
    secret: ''
});
/* jshint +W106 */

var trackStream  = lastfm.stream('dashner123');

module.exports = function(nodecg) {
    var pulseTimeout;
    var pulsing = nodecg.Replicant('pulsing', {defaultValue: false, persistent: false});
    var nowPlaying = nodecg.Replicant('nowPlaying', {defaultValue: {}, persistent: false});

    nodecg.listenFor('np_pulse', pulse);
    function pulse() {
        // Don't stack pulses
        if (pulsing.value) return;
        pulsing.value = true;

        // Hard-coded 10 second duration
        pulseTimeout = setTimeout(function() {
            pulsing.value = false;
        }, 10 * 1000);
    }

    trackStream.on('nowPlaying', function(track) {
        nowPlaying.value = {
            artist: track.artist['#text'],
            song: track.name,
            album: track.album['#text'],
            cover: track.image[2]['#text'],
            artistSong: track.artist['#text'] + ' - ' + track.name
        };

        // If the graphic is already showing, end it prematurely and show the new song
        if (pulsing.value) {
            clearTimeout(pulseTimeout);
            pulsing.value = false;
        }

        // Show the graphic
        pulse();
    });

    trackStream.on('error', function(error) {
        // Just ignore it, this lib generates tons of errors.
        //nodecg.log.error(error.message);
    });

    trackStream.start();
};
