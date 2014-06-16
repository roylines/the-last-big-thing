var content = require('./lib/content'),
  fs = require('fs'),
  integrations = require('./integrations/integrations'),
  router = require('router')(),
  server = require('http').Server(),
  io = require('socket.io')(server);
//app = require('http').createServer(router),
//io = require('socket.io')(app);

server.on('request', router);

// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.set("transports", ["xhr-polling"]);
if (process.env.HEROKU === 'true') {
  io.set("transports", ["xhr-polling"]);
  //io.set("polling duration", 10);
};

var port = process.env.PORT || 8000;

//app.listen(port);
server.listen(port);

console.log('Server running on ' + port);

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
      io.sockets.emit(req.params.token, transformed);
      res.end();
    });
  });
});

io.sockets.on('connection', function(socket) {
  console.log('connected socket', socket);
});
