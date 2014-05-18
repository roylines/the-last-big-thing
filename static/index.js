var lastBigThing = function(data) {
  $('#lbt').html(data);
};

$(function() {
  var socket = io.connect('http://localhost:8000');
  socket.on('last-big-thing', lastBigThing);
});
