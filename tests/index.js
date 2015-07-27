'use strict';

// foreign modules

var test = require('tape');

// local modules

var deadline = require('..');

// this modules

require('tape-chai');

test('exports an Object', function (t) {
  t.isObject(deadline);
  t.end();
});
