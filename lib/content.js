var fs = require('fs'),
  response = require('response'),
  content = {};

content.static = function(name) {
  return function(req, res) {
    var f = fs.createReadStream('static/' + name);
    return f.pipe(response.html()).pipe(res);
  }
};

module.exports = content;
