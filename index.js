var content = require('./lib/content'),
  body = require('raw-body'),
  router = require('router')(),
  app = require('http').createServer(router),
  io = require('socket.io').listen(app);

var authorization = function(data, done) {
  console.log('authorization', data);
  return done(null, true);
};

io.enable('browser client minification'); // send minified client
io.enable('browser client etag'); // apply etag caching logic based on version number
io.enable('browser client gzip'); // gzip the file
io.set('log level', 1); // reduce logging
// io.set('authorization', authorization); 

// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
if (process.env.HEROKU === 'true') {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
};

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server running on ' + port);

router.get('/', content.static('index.html'));
router.get('/index.js', content.static('index.js'));
router.get('/styles.css', content.static('styles.css'));

router.post('/integration/{integration}/{token}', function(req, res) {
  body(req, function(e, s) {
    var integration = require('./integrations/' + req.params.integration);
    integration.transform(s.toString(), function(e, transformed) {
      io.sockets.emit(req.params.token, transformed);
      res.end();
    });
  });
});

/*
io.sockets.on('connection', function(socket) {
  console.log('connected socket');
});
*/
