var fs = require('fs'),
  github = require('../integrations/github'),
  test = require('tap').test;

/*
test('new issue', function(t) {
  fs.readFile('./data/github-new-issue.json', function(e, d) {
    github.transform(d.toString(), function(e, transformed) {
      //console.error('TRANSFORMED: ', transformed);
      t.equal('A', 'A', "thingie should be thing");
      t.end();
    });
  });
});
*/
