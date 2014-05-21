var lastBigThing = function(data) {
  console.log('data received', data);
  var html = '<h1>' + data.title + '<h1>';
  html += '<h2>' + data.sub + '</h2>';
  html += '<p>' + data.text + '</p>';

  $('#lbt').html(html);
};

$(function() {
  var origin = window.location.origin;
  var socket = io.connect(origin);
  socket.on('AABBCC', lastBigThing);
});
