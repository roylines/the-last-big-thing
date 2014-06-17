var content = require('./lib/content'),
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
  integrations.get(req.params.integration, function(e, integration) {
    if (e) {
      console.error(e);
      return res.end();
    }
    integration.transform(req, function(e, transformed) {
      if (e) {
        console.error(e);
        return res.end();
      }
      io.emit(req.params.token, transformed);
      res.end();
    });
  });
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

server.listen(port, function() {
  console.log('listening on ' + port);
});
