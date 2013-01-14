const fs = require('fs');
const test = require('tap').test;
const base64url = require('..');
const testString = fs.readFileSync('test.jpg').toString();

function base64(s) {
  return Buffer(s).toString('base64')
}

test('from string to base64url', function (t) {
  const b64 = base64(testString);
  const b64url = base64url(testString);
  t.same(b64url.indexOf('+'), -1, 'should not contain plus signs');
  t.same(b64url.indexOf('/'), -1, 'should not contain slashes');
  t.same(b64url.indexOf('='), -1, 'should not contain equal signs');
  t.same(b64.indexOf('+'), b64url.indexOf('-'), 'should replace + with -');
  t.same(b64.indexOf('/'), b64url.indexOf('_'), 'should replace / with _');
  t.end();
});

test('from base64url to base64', function (t) {
  const b64 = base64(testString);
  const b64url = base64url(testString);
  const result = base64url.toBase64(b64url);
  t.same(result, b64, 'should be able to convert back');
  t.end();
});
