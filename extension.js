'use strict';

module.exports = function(nodecg) {
    try {
        require('./extension/lowerthird')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load lowerthird lib:', e.stack);
        process.exit(1);
    }

    /*try {
        require('./extension/total')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load total lib:', e.stack);
        process.exit(1);
    }*/

    try {
        require('./extension/donations')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load donations lib:', e.stack);
        process.exit(1);
    }

    try {
        require('./extension/nowplaying')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "now playing" lib:', e.stack);
        process.exit(1);
    }
};
