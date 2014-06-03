var _ = require('lodash'),
  fs = require('fs');

var integrations = {};

var integrations = fs.readdirSync(__dirname);

integrations.get = function(name, done) {
  if (_.indexOf(integrations, name + '.js') === -1) {
    return done('unknown integration');
  }
  return done(null, require(__dirname + '/' + name));
};


module.exports = integrations;
