/* global TweenLite, Power1 */
(function() {
    'use strict';

    nodecg.Replicant('mainShowing', {defaultValue: true}).on('change', function(oldVal, newVal) {
        if (newVal) {
            TweenLite.to(document.body, 0.6, {opacity: 1, ease: Power1.easeInOut});
        } else {
            TweenLite.to(document.body, 0.6, {opacity: 0, ease: Power1.easeInOut});
        }
    });
})();