'use strict';

// TODO: Make this pull from the config, and not be hardcoded
var SECRET_KEY = 'VjAJRS95)57I8DL';
var app = require('express')();
module.exports = function(nodecg) {
    app.post('/toth3-overlay/donation', function(req, res){
        if (req.query.key !== SECRET_KEY) {
            res.status(403).send('Not Authorized');
            return;
        }
        nodecg.sendMessage('donation', req.body);
        res.end();
    });

    nodecg.mount(app);
};
