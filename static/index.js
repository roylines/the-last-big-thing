var success = function(data) {
  $('#lbt').html(data);
  poll();
};

var error = function() {
  setTimeout(poll, 10000);
};

var poll = function() {
  $.ajax({
    url: "data",
    success: success,
    dataType: "html",
    error: error,
    timeout: 30000
  });
};

$(function() {
  poll();
});
