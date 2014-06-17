var _ = require('lodash'),
  async = require('async'),
  content = require('./lib/content'),
  fs = require('fs'),
  integrations = require('./integrations/integrations'),
  router = require('router')(),
  server = require('http').Server(router),
  io = require('socket.io')(server);

var port = process.env.PORT || 8000;

if (process.env.HEROKU === 'true') {
  console.log('available transports', io.engine.transports);
}

router.get('/', content.static('index.html'));
router.get('/index.js', content.static('index.js'));
router.get('/styles.css', content.static('styles.css'));

router.post('/integration/{integration}/{token}', function(req, res) {
  console.log('an integration has sent data', req.params.integration, req.params.token);
  var get = function(done) {
    console.log('getting integration');
    return integrations.get(req.params.integration, done);
  };

  var transform = function(integration, done) {
    console.log('transforming integration');
    return integration.transform(req, done);
  };

  var emit = function(transformed, done) {
    console.log('emitting integration');
    io.emit(req.params.token, transformed);
    return done();
  };

  var end = function(e) {
    console.log('ending integration');
    if (e) {
      console.error('integration update', e);
      res.statusCode = 500;
    }
    return res.end();
  }

  return async.waterfall([get, transform, emit], end);
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

server.listen(port, function() {
  console.log('listening on ' + port);
});
