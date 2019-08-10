(function(module) {
  'use strict';

  module.exports.parsingHomecardsIds = function parsingHomecardsIds(numberOfResults, homecards) {
    const ids = [];

    for (let i = 0; i < numberOfResults; i++) {
      ids.push(homecards[i].id);
    }

    return ids;
  };
})(module);
