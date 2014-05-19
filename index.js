var content = require('./lib/content'),
  router = require('router')(),
  app = require('http').createServer(router),
  io = require('socket.io').listen(app);

// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
if (process.env.HEROKU === 'true') {
  io.configure(function() {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });
}

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server running on ' + port);

router.get('/', content.static('index.html'));
router.get('/index.js', content.static('index.js'));
router.get('/styles.css', content.static('styles.css'));

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
