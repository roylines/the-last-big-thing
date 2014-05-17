var success = function(data) {
  $('#lbt').html(data);
};

$(function() {
  (function poll() {
    $.ajax({
      url: "data",
      success: success,
      dataType: "html",
      complete: poll,
      timeout: 30000
    });
  })();
});
