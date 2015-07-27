'use strict';

// 3rd-party modules

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

// this module

gulp.task('build:lib', [], function () {
  var main = './index.js';
  var b = browserify({ entries: main, standalone: 'deadline' });
  return b.bundle()
    .pipe(source(main))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build:lib'], function () {});
