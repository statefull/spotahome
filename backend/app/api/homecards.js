(function(module) {
  'use strict';

  const httpStatus = require('http-status-codes'),
    qs = require('qs'),
    axios = require('axios'),
    parsingHomecardsIds = require('../utils/parsing').parsingHomecardsIds;

  module.exports.getRelevantHomeCards = function getRelevantHomeCards(
    maxNumberOfHomecards,
    spotahomeEndpoints,
  ) {
    return function getRelevantHomeCards(req, res) {
      axios
        .get(spotahomeEndpoints.homecardsByRelevance)
        .then(_parseHomecards.bind(this, maxNumberOfHomecards, spotahomeEndpoints))
        .then(_generateAndSendRelevantHomecards.bind(this, res))
        .catch(function(error) {
          // TODO: track error
          res.status(httpStatus.NO_CONTENT).send();
        });
    };
  };

  function _parseHomecards(maxNumberOfHomecards, spotahomeEndpoints, response) {
    const { data } = response.data;
    const numberOfResults = data.length < maxNumberOfHomecards ? data.length : maxNumberOfHomecards;

    const ids = parsingHomecardsIds(numberOfResults, data);

    return axios.get(spotahomeEndpoints.homecardsInformation, {
      params: {
        ids,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
  }

  function _generateAndSendRelevantHomecards(res, response) {
    const {
      data: { homecards },
    } = response.data;

    const homecardsMapped = homecards.map(
      ({ id, adId, currencySymbol, pricePerMonth, photoUrls: { homecardHidpi }, title }) => ({
        id,
        adId,
        currencySymbol,
        pricePerMonth,
        photoUrls: { homecardHidpi },
        title,
      }),
    );

    res.status(httpStatus.OK).send({ homecards: homecardsMapped });
  }
})(module);
