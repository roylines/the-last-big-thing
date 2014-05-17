var fs = require('fs'),
  http = require('http'),
  response = require('response'),
  router = require('router')();

var staticContent = function(name, res) {
  var f = fs.createReadStream('static/' + name);
  return f.pipe(response.html()).pipe(res);
};

router.get('/', function(req, res) {
  return staticContent('index.html', res);
});

/*
router.get('/data', function(req, res) {
  setTimeout(function() {
    var data = {
      title: 'TITLE',
      when: new Date().getTime()
    };
    return response.json(data).pipe(res);
  }, 5000);
});
*/

router.get('/data', function(req, res) {
  setTimeout(function() {
    var html = '<h1>' + new Date().getTime() + '</h1>'
    return response.html(html).pipe(res);
  }, 5000);
});

router.get('/{page}', function(req, res) {
  return staticContent(req.params.page, res);
});

http.createServer(router).listen(8000);

console.log('Server running on http://localhost:8000');
