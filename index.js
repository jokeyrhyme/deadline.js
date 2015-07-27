'use strict';

module.exports = {

  /**
  @param {Promise} promise to wait for
  @param {Number} timeout maximum milliseconds to wait
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
  }

};
