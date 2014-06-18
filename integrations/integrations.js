var _ = require('lodash'),
  fs = require('fs');

var integrations = fs.readdirSync(__dirname);

module.exports = function(name) {
  console.log('looking up integration: ', name);

  if (_.indexOf(integrations, name + '.js') === -1) {
    return null;
  }

  return require(__dirname + '/' + name);
};
