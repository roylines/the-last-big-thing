var fs = require('fs'),
  response = require('response'),
  router = require('router')(),
  app = require('http').createServer(router),
  io = require('socket.io').listen(app);

app.listen(8000);
console.log('Server running on http://localhost:8000');

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

setInterval(function() {
  console.log('last-big-thing');
  var html = '<h1>' + new Date().getTime() + '</h1>';
  io.sockets.emit('last-big-thing', html);
}, 1000);

io.sockets.on('connection', function(socket) {
  console.log('connected socket');
});
