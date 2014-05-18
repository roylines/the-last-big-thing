var fs = require('fs'),
  response = require('response'),
  router = require('router')(),
  app = require('http').createServer(router),
  io = require('socket.io').listen(app);

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server running on ' + port);

var staticContent = function(name, res) {
  var f = fs.createReadStream('static/' + name);
  return f.pipe(response.html()).pipe(res);
};

router.get('/', function(req, res) {
  return staticContent('index.html', res);
});

router.get('/{page}', function(req, res) {
  return staticContent(req.params.page, res);
});

router.post('/integration/{integration}/{token}', function(req, res) {
  console.log('last-big-thing', req.params.integration, req.params.token, req);

  var html = '<h1>' + req.params.integration + '</h1>';
  //var html = '<p>' + JSON.stringify(req.body) + '</p>';
  io.sockets.emit(req.params.token, html);
  res.end();
});

/*
io.sockets.on('connection', function(socket) {
  console.log('connected socket');
});
*/
