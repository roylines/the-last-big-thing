var through = require('through');

module.exports = function() {
  function write(data) {
    var json = JSON.parse(data);
    var transformed = {};
    if (json.comment) {
      transformed.utc = new Date(json.comment.updated_at).getTime();
      transformed.title = [json.comment.user.login, " commented on an issue in GitHub"].join('<br/>');
      transformed.details = [json.comment.body, json.repository.name + ': ' + json.issue.title].join('<br/>');
    }
    this.queue(JSON.stringify(transformed));
  };

  return through(write);
};
