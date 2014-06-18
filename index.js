var _ = require('lodash'),
  async = require('async'),
  content = require('./lib/content'),
  emit = require('./lib/emit'),
  fs = require('fs'),
  integrations = require('./integrations/integrations'),
  router = require('router')(),
  server = require('http').Server(router),
  io = require('socket.io')(server);

router.get('/', content.static('index.html'));
router.get('/index.js', content.static('index.js'));
router.get('/styles.css', content.static('styles.css'));

router.post('/integration/{integration}/{token}', function(req, res) {
  function end() {
    return res.end();
  }
  
  var integration = integrations(req.params.integration);
  if(!integration) {
    res.statusCode = 404;
    return end();
  }

  return req
    .pipe(integration())
    .pipe(emit(io, req.params.token))
    .on('end', end);
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

var port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log('listening on ' + port);
});
