(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deadline = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {

  /**
  @param {Function} fn to execute
  @param {Number} timeout milliseconds to wait
  @returns {Function} wrapped `fn`, called automatically per-timeout
  */
  fn: function fn(_fn, timeout) {
    var timer;
    var newFn = function newFn() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      return _fn.apply(this, arguments);
    };
    timer = setTimeout(newFn, timeout);
    return newFn;
  },

  /**
  @param {Promise} promise to wait for
  @param {Number} timeout milliseconds to wait
  @returns {Promise} new Promise rejects when deadline exceeded
  */
  promise: function promise(_promise, timeout) {
    return new Promise(function (resolve, reject) {
      var isExceeded = false;

      var timer = setTimeout(function () {
        isExceeded = true;
        reject(new Error(timeout + 'ms deadline exceeded'));
      }, timeout);

      _promise.then(function () {
        // resolved
        if (!isExceeded) {
          clearTimeout(timer);
          resolve.apply(_promise, arguments);
        }
      }, function () {
        // rejected
        if (!isExceeded) {
          clearTimeout(timer);
          reject.apply(_promise, arguments);
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
  */
  callback: function callback(fn, timeout, _callback) {
    var isExceeded = false;

    var timer = setTimeout(function () {
      isExceeded = true;
      _callback(new Error(timeout + 'ms deadline exceeded'));
    }, timeout);

    fn(function (err, data) {
      if (!isExceeded) {
        clearTimeout(timer);
        _callback(err, data);
      }
    });
  }

};

},{}]},{},[1])(1)
});