var map = [{
    tag: 'h1',
    html: 'GITHUB'
  }, {
    tag: 'h2',
    html: ''
  }, {
    tag: 'p',
    html: ''
  }
];

module.exports = {
  transform: require('./json')(map)
};
