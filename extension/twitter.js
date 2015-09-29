/* jshint -W106 */
'use strict';

// Put your Twitter API credentials here
var Twitter = require('twitter');
var twitter = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});


module.exports = function(nodecg) {
    var tweetShowing = nodecg.Replicant('tweetShowing', { defaultValue: false, persistent: false });
    var tweetPulsing = nodecg.Replicant('tweetPulsing', { defaultValue: false, persistent: false });
    var tweet = nodecg.Replicant('tweet', { defaultValue: {} });

    nodecg.listenFor('getTweet', function(url) {
        var id = url.split('/').pop();
        twitter.get('statuses/show', {id: id, include_my_retweet: false}, function(error, tw){
            if (error) {
                nodecg.log.error('Couldn\'t get tweet:', error[0].message);
                return;
            }

            tweet.value = tw;
        });
    });

    nodecg.listenFor('pulseTweet', function pulse(duration) {
        // Don't stack pulses
        if (tweetPulsing.value) return;

        tweetShowing.value = true;
        tweetPulsing.value = true;

        // End pulse after "duration" seconds
        setTimeout(function() {
            tweetShowing.value = false;
            tweetPulsing.value = false;
        }, duration * 1000);
    });
};
