'use strict';

var app = require('express')();
module.exports = function(nodecg) {
    if (!nodecg.bundleConfig || !nodecg.bundleConfig.donationKey) {
        throw new Error('cfg/toth3-overlay.json is missing the "donationKey" property');
    }

    app.post('/toth3-overlay/donation', function(req, res){
        if (req.query.key !== nodecg.bundleConfig.donationKey) {
            res.status(403).send('Not Authorized');
            return;
        }
        nodecg.sendMessage('donation', req.body);
        res.end();
    });

    nodecg.mount(app);
};
