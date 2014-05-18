var lastBigThing = function(data) {
  console.log('data received', data);
  $('#lbt').html(data);
};

$(function() {
  var origin = window.location.origin;
  var socket = io.connect(origin);
  socket.on('AABBCC', lastBigThing);
});
