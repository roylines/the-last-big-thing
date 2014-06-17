var async = require('async'),
  j2h = require('node-json2html'),
  body = require('raw-body'),
  json = {};

module.exports = function(map) {
  return function(req, done) {
    var extract = function(cb) {
      return body(req, cb);
    };

    var transform = function(b, cb) {
      var json = JSON.parse(b.toString());
      console.log('integration', JSON.stringify(json));
      return cb(null, j2h.transform(json, map));
    };

    return async.waterfall([extract, transform], done);
  };
};
