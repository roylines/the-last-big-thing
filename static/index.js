var btconfig = {
  maxfontsize: 80,
  minfontsize: 16
};

var lastBigThing = function(data) {
  console.log(data);
  $('#lbt').fadeOut();
  $('#title').html(data.title);
  $('#details').html(data.details);
  $('#utc').text("This happened: " + new Date(data.utc).toLocaleString());

  $('#lbt').bigtext(btconfig).fadeIn();
};

$(function() {
  $('#lbt').bigtext(btconfig);
  var socket = io();
  socket.on('AABBCC', lastBigThing);
});
