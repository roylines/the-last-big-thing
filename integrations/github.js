var through = require('through');

module.exports = function() {
  function write(data) {
    var json = JSON.parse(data);
    var transformed = {};
    if (json.comment) {
      transformed.utc = new Date(json.comment.updated_at).getTime();
      transformed.title = json.comment.user.login + " commented on an issue in GitHub";
      transformed.details = "\"" + json.comment.body + "\" about issue \"" + json.issue.title + "\" in " + json.repository.name;
    }
    this.queue(JSON.stringify(transformed));
  };

  return through(write);
};
