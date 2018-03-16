// src/server.js
const express = require('express');
const config = require('./config');
const app = express();

app.use('/doc', function(req, res, next) {
   res.end(`Documentation http://expressjs.com/`);
 });

app.use(function(req, res, next) {
   res.end("<html><head><title>Can you see me?<title></head><body>blarg</body></html>");
 });

 app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
 });

const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
