/* global TweenLite, Power1 */
(function() {
    'use strict';

    createjs.Sound.volume = 0;

    console.log(createjs.Sound.volume);

    setTimeout(function() {
        //TweenLite.to(createjs.Sound, 0.5, {volume: 1});
    }, 1000);

    nodecg.Replicant('mainShowing', {defaultValue: true}).on('change', function(oldVal, newVal) {
        if (newVal) {
            TweenLite.to(document.body, 0.6, {opacity: 1, ease: Power1.easeInOut});
        } else {
            TweenLite.to(document.body, 0.6, {opacity: 0, ease: Power1.easeInOut});
        }
    });
})();