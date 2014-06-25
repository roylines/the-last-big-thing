var lastBigThing = function(data) {
  $('#integration').text(data.integration);
  $('#lbt').bigtext();
  //$('#title').fadeOut().text(data.integration).bigtext().fadeIn();
};

$(function() {

  $('#lbt').bigtext();
  var socket = io();
  socket.on('AABBCC', lastBigThing);
});
