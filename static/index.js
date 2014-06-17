var lastBigThing = function(html) {
  $('#lbt').fadeOut().html(html).fadeIn();
};

$(function() {
  var socket = io();
  socket.on('AABBCC', lastBigThing);
});
