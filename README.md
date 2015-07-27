# deadline.js

wait for a callback or Promise, but give up if it has been too long

[![npm module](https://img.shields.io/npm/v/@jokeyrhyme/deadline.svg)](https://www.npmjs.com/package/@jokeyrhyme/deadline)
[![travis-ci](https://img.shields.io/travis/jokeyrhyme/deadline.js.svg)](https://travis-ci.org/jokeyrhyme/deadline.js)

## API

### `.promise(promise, timeout)`

- @param {`Promise`} promise to wait for
- @param {`Number`} timeout maximum milliseconds to wait
- @returns {`Promise`} new Promise rejects when deadline exceeded
