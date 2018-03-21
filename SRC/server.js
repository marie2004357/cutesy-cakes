// src/server.js
const express = require('express');
const config = require('./config');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/doc', function(req, res, next) {
res.end(`Documentation http://expressjs.com/`);
 });

app.use(function(req, res, next) {
    res.end("Cutesy Cakes");
});

 app.listen(config.port, function() {
 console.log(`${config.appName} is listening on port ${config.port}`);
 });

