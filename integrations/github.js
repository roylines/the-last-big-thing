var github = {};

github.transform = function(data, done) {
  var json = JSON.parse(data);

  var transformed = {
    src: 'GitHub',
    title: 'New GitHub Issue',
    sub: json.issue.title,
    utc: new Date().getTime(),
    text: json.issue.body 
  };

  return done(null, transformed);
};



module.exports = github;
