var through = require('through');

module.exports = function() {
  function write(data) {
    var json = JSON.parse(data);
    var html = '<h1>GITHUB</h1>';
    this.queue(html);
  };

  return through(write);
};
