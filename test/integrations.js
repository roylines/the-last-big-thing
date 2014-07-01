var fs = require('fs'),
  concat = require('concat-stream'),
  github = require('../integrations/github'),
  test = require('tap').test;

var check = function(integration, file) {
  return function(t) {
    var verify = concat(function(data) {
      var expected = fs.readFileSync('./data/' + file + '-expected.json');
      t.deepEqual(JSON.parse(data), JSON.parse(expected), 'json should be as expected');
      t.end();
    });

    fs.createReadStream('./data/' + file + '.json')
      .pipe(integration())
      .pipe(verify);
  };
};

//test('new github issue', check(github, 'github-new-issue'));
//test('new github comment', check(github, 'github-new-comment'));
