var lastBigThing = function(data) {
  console.log('data received', data);
  $('#lbt').html(data);
};

$(function() {
  var socket = io.connect('http://localhost:8000');
  socket.on('AABBCC', lastBigThing);
});
