/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var notifier = require('node-notifier');
var concat = require('gulp-concat');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};


var bundler =  browserify({
  entries: ['./public_html/js/main.js'] ,
  debug: true,
  cache: {},
  noParse: ['./public_html/js/vendor/jquery-1.11.2','./public_html/js/vendor/modernizr-2.8.3-respond-1.4.2.min'],
  packageCache: {},
  fullPaths: true
});

function bundle() {
     
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
}



gulp.task('default', function () {
     bundle();
});

gulp.task('js', function () {
     return browserify('./public_html/js/main.js')
             .bundle()
             .pipe(source('bundle.js'))
             .pipe(gulp.dest('.'))
});
