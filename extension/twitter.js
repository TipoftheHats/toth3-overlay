/* jshint -W106 */
'use strict';

var Twitter = require('twitter');
var twitter = new Twitter({
    consumer_key: '8WYQdXpVZj5GP2qnZHT2iBYcJ',
    consumer_secret: 'SzKOjhhqxWcHVOynivhL4e1tSKoEsFSGg5U5KvFqlMIPX2XBAj',
    access_token_key: '23874413-FmACpeLyncxibzSrpNQdjyNFMe1APpMPU9pvmlTFq',
    access_token_secret: '1tJgGp7u9M7ppw8sgiN97wRSUrq5w0JhQqoteYoz9CagN'
});


module.exports = function(nodecg) {
    var tweetShowing = nodecg.Replicant('tweetShowing', { defaultValue: false, persistent: false });
    var tweetPulsing = nodecg.Replicant('tweetPulsing', { defaultValue: false, persistent: false });
    var tweet = nodecg.Replicant('tweet', { defaultValue: {}, persistent: false });

    nodecg.listenFor('getTweet', function(url) {
        var id = url.split('/').pop();
        twitter.get('statuses/show', {id: id, include_my_retweet: false}, function(error, tw){
            if (error) {
                nodecg.log.error(error);
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
