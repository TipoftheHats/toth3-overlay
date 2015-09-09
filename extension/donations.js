'use strict';

var app = require('express')();
module.exports = function(nodecg) {
    app.post('/toth3-overlay/donation', function(req, res){
        nodecg.sendMessage('donation', JSON.parse(req.body));
        res.end();
    });

    nodecg.mount(app);
};
