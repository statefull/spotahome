(function(module) {
  'use strict';

  const httpStatus = require('http-status-codes'),
    config = require('../config/config.json'),
    homecards = require('./api/homecards'),
    endpoint = require('../config/endpoints.json');

  module.exports.load = function loadRoutes(app) {
    app.use('/api/:versionId', function checkAPIVersion(req, res, next) {
      if (req.params.versionId != 'v1') {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: httpStatus.getStatusText(httpStatus.BAD_REQUEST) });
      } else {
        if (next) {
          next();
        }
      }
    });

    app.get(
      endpoint.RELEVANT_HOMECARDS,
      homecards.getRelevantHomeCards(config.app.numberOfHomecards, config.app.spotahomeEndpoints),
    );
  };
})(module);
