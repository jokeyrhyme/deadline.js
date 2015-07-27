'use strict';

// foreign modules

var test = require('tape');

// local modules

var deadline = require('..');

// this modules

require('tape-chai');

function oneSecPromise () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('abc');
    }, 1e3);
  });
}

function oneSecCallback (callback) {
  setTimeout(function () {
    callback(null, 'abc');
  }, 1e3);
}

function oneSecCallbackLast (one, two, callback) {
  oneSecCallback(callback);
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

test('deadline=500ms, oneSecPromise, rejects', function (t) {
  t.plan(2);
  deadline.promise(oneSecPromise(), 500).then(function () {
    t.fail('unexpectedly resolve()ed');
  }, function (err) {
    t.pass('reject()ed as expected');
    t.instanceOf(err, Error);
  });
});

test('deadline=1500ms, oneSecPromise, resolves', function (t) {
  t.plan(2);
  deadline.promise(oneSecPromise(), 1500).then(function (data) {
    t.pass('resolve()ed as expected');
    t.equal(data, 'abc');
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

test('deadline=500ms, oneSecCallback, callback called with error', function (t) {
  t.plan(2);
  deadline.callback(oneSecCallback, 500, function (err) {
    t.pass('reject()ed as expected');
    t.instanceOf(err, Error);
  });
});

test('deadline=1500ms, oneSecCallback, callback called', function (t) {
  t.plan(3);
  deadline.callback(oneSecCallback, 1500, function (err, data) {
    t.pass('resolve()ed as expected');
    t.error(err);
    t.equal(data, 'abc');
  });
});

test('deadline=500ms, oneSecCallbackLast, callback called with error', function (t) {
  t.plan(2);
  deadline.callback(function (done) {
    oneSecCallbackLast(1, 2, done);
  }, 500, function (err) {
    t.pass('reject()ed as expected');
    t.instanceOf(err, Error);
  });
});

test('deadline=1500ms, oneSecCallbackLast, callback called', function (t) {
  t.plan(3);
  deadline.callback(function (done) {
    oneSecCallbackLast(1, 2, done);
  }, 1500, function (err, data) {
    t.pass('resolve()ed as expected');
    t.error(err);
    t.equal(data, 'abc');
  });
});
