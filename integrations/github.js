var body = require('raw-body');
var github = {};

github.transform = function(req, done) {
  body(req, function(e, s) {
    if(e) {
      return done(e);
    }

    var json = JSON.parse(s.toString());

    var transformed = json;
    /*
    var transformed = {
      src: 'GitHub',
      title: 'New GitHub Issue',
      sub: json.issue.title,
      utc: new Date().getTime(),
      text: json.issue.body
    };
    */

    return done(null, transformed);
  });
};

module.exports = github;
