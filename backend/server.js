(function(logger) {
  'use strict';
  const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    compress = require('compression'),
    routes = require('./app/routes'),
    config = require('./config/config.json');

  var app = (module.exports = express());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
  });

  app.disable('x-powered-by');
  app.use(compress());

  app.set('appPort', config.app.listeningPort);

  routes.load(app);

  var server = http.createServer(app);
  server.listen(app.get('appPort'), function() {
    logger.log('Server listening on port ' + app.get('appPort'));
  });
})(console);
