'use strict';

module.exports = function(nodecg) {
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
};
