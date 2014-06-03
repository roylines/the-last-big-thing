var body = require('raw-body');

var general = {};

/*
curl -H "Content-Type: application/json" -d '{"src":"SRC","title":"TITLE", "sub": "SUB", "utc": 1, "text": "TEXT"}' http://localhost:8000/integration/general/AABBCC
*/

general.transform = function(req, done) {
  body(req, function(e, s) {
    if(e) {
      return done(e);
    }
    var json = JSON.parse(s.toString());
    return done(null, json);
  });
};

module.exports = general;
