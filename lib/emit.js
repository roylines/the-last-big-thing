var through = require('through');

module.exports = function(io, token) {
  function write(data) {
    console.log('emitting', data.toString());
    io.emit(token, data.toString());
    this.queue(data);
  };

  return through(write);
};
