'use strict';

// foreign modules

var test = require('tape');

// local modules

var deadline = require('..');

// this modules

require('tape-chai');

function oneSecPromise () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1e3);
  });
}

function oneSecCallback (callback) {
  setTimeout(callback, 1e3);
}

test('exports an Object', function (t) {
  t.isObject(deadline);
  t.end();
});

test('oneSecPromise resolves', function (t) {
  t.plan(1);
  oneSecPromise().then(function () {
    t.ok(true);
  });
});

test('deadline=500ms, oneSecPromise rejects', function (t) {
  t.plan(2);
  deadline.promise(oneSecPromise(), 500).then(function () {
    t.fail('unexpectedly resolve()ed');
  }, function (err) {
    t.pass('reject()ed as expected');
    t.instanceOf(err, Error);
  });
});

test('deadline=1500ms, oneSecPromise resolves', function (t) {
  t.plan(1);
  deadline.promise(oneSecPromise(), 1500).then(function () {
    t.pass('resolve()ed as expected');
  }, function (err) {
    t.fail('unexpectedly reject()ed');
    t.error(err);
  });
});

test('oneSecCallback called', function (t) {
  t.plan(1);
  oneSecCallback(function () {
    t.ok(true);
  });
});
