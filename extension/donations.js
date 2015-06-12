'use strict';

var app = require('express')();
module.exports = function(nodecg) {
    app.post('/toth3-overlay/donation', function(req, res){
        console.log(req.body);
        nodecg.sendMessage('donation', req.body.content);
        res.end();
    });

    nodecg.mount(app);
};
