# deadline.js

wait for a callback or Promise, but give up if it has been too long

[![npm module](https://img.shields.io/npm/v/@jokeyrhyme/deadline.svg)](https://www.npmjs.com/package/@jokeyrhyme/deadline)
[![travis-ci](https://img.shields.io/travis/jokeyrhyme/deadline.js.svg)](https://travis-ci.org/jokeyrhyme/deadline.js)

## API

```js
var deadline = require('@jokeyrhyme/deadline');
```


### `.promise(promise, timeout)`

- @param {`Promise`} promise to wait for
- @param {`Number`} timeout milliseconds to wait
- @returns {`Promise`} new Promise rejects when deadline exceeded

For example:

```js
deadline.promise(makeFastPromise(), 500).then(function () {
  // onResolve...
  // executed before 500ms, deadline not exceeded
});

deadline.promise(makeSlowPromise(), 500).then(null, function () {
  // onReject...
  // executed around 500ms, deadline exceeded
});
```


### `.callback(fn, timeout, callback)`

- @param {`FunctionTakingErrorFirstCallback`} fn to execute
- @param {`Number`} timeout milliseconds to wait
- @param {`ErrorFirstCallback`} called with timeout Error or results from fn

For example:

```js
deadline.callback(function (done) {
  fastAsyncFn(1, 2, done);
}, 500, function (err, data) {
  // executed before 500ms, deadline not exceeded
  // `err` and `data` are original values from `fastAsyncFn()`
});

deadline.callback(function (done) {
  slowAsyncFn(1, 2, done);
}, 500, function (err) {
  // executed around 500ms, deadline exceeded
  // `err` is the deadline Error
});
```


#### @callback `ErrorFirstCallback`

- @param {?`Error`} error or `null` (if no error)
- @param {...} optional, zero or more return data (if no error)

We document this here for completeness.


#### @callback `FunctionTakingErrorFirstCallback`

- @param {ErrorFirstCallback} called when done

We document this here for completeness.
