'use strict';

module.exports = {

  /**
  @param {Function} fn to execute
  @param {Number} timeout milliseconds to wait
  @returns {Function} wrapped `fn`, called automatically per-timeout
  */
  fn: function (fn, timeout) {
    var timer;
    var newFn = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      return fn.apply(this, arguments);
    };
    timer = setTimeout(newFn, timeout);
    return newFn;
  },

  /**
  @param {Promise} promise to wait for
  @param {Number} timeout milliseconds to wait
  @returns {Promise} new Promise rejects when deadline exceeded
  */
  promise: function (promise, timeout) {
    return new Promise(function (resolve, reject) {
      var isExceeded = false;

      var timer = setTimeout(function () {
        isExceeded = true;
        reject(new Error(timeout + 'ms deadline exceeded'));
      }, timeout);

      promise.then(function () { // resolved
        if (!isExceeded) {
          clearTimeout(timer);
          resolve.apply(promise, arguments);
        }
      }, function () { // rejected
        if (!isExceeded) {
          clearTimeout(timer);
          reject.apply(promise, arguments);
        }
      });
    });
  },

  /**
  @callback ErrorFirstCallback
  @param {?Error} error or `null` (if no error)
  @param {...} optional, zero or more return data (if no error)
  */

  /**
  @callback FunctionTakingErrorFirstCallback
  @param {ErrorFirstCallback} called when done
  */

  /**
  @param {Function} fn to execute
  @param {Number} timeout milliseconds to wait
  @param {ErrorFirstCallback} callback called with timeout Error or results from fn
  @returns {Promise} accidental Promise
  */
  callback: function (fn, timeout, callback) {
    return new Promise(function (resolve, reject) {
      var isExceeded = false;

      var timer = setTimeout(function () {
        isExceeded = true;
        callback(new Error(timeout + 'ms deadline exceeded'));
      }, timeout);

      fn(function (err, data) {
        if (!isExceeded) {
          clearTimeout(timer);
          callback(err, data);
        }
      });
    });
  }

};
