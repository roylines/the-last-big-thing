var through = require('through');

module.exports = function(io, token) {
  function write(data) {
    io.emit(token, JSON.parse(data));
    this.queue(data);
  };

  return through(write);
};
