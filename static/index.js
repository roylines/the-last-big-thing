var btconfig = {
  maxfontsize: 80,
  minfontsize: 16
};

var lastBigThing = function(data) {
  console.log(data);
  $('#lbt').fadeOut();
  $('#title').text(data.title);
  $('#details').text(data.details);
  $('#utc').text("This happened: " + new Date(data.utc).toLocaleString());

  $('#lbt').bigtext(btconfig).fadeIn();
};

$(function() {
  $('#lbt').bigtext(btconfig);
  var socket = io();
  socket.on('AABBCC', lastBigThing);
});
