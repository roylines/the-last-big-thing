var through = require('through');

module.exports = function() {
  function write(data) {
    var json = JSON.parse(data);
    var transformed = {
      integration: 'GitHub'
    };
    this.queue(JSON.stringify(transformed));
  };

  return through(write);
};
