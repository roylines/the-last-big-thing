/*
curl -H "Content-Type: application/json" -d '{"src":"SRC","title":"TITLE", "sub": "SUB", "utc": 1, "text": "TEXT"}' http://localhost:8000/integration/general/AABBCC
*/

var map = [{
    tag: 'h1',
    html: '${title}'
  }, {
    tag: 'h2',
    html: '${sub}'
  }, {
    tag: 'p',
    html: '${text}'
  }
];

module.exports = {
  transform: require('./json')(map)
};
