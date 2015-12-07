/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var notifier = require('node-notifier');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


var notify = function (error) {
    var message = 'In: ';
    var title = 'Error: ';

    if (error.description) {
        title += error.description;
    } else if (error.message) {
        title += error.message;
    }

    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length - 1];
    }

    if (error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }

    notifier.notify({title: title, message: message});
};


var bundler = browserify({
    entries: ['./src/js/main.js'],
    debug: true,
    cache: {},
    noParse: ['./src/js/vendor/jquery-1.11.2.js', './src/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js'],
    packageCache: {},
    fullPaths: true
});

function bundle() {

    return bundler
            .bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./build/js'))
}

gulp.task('bundle-js', ['clean'],function () {
    bundle();
});


gulp.task('clean', function () {
    return del([
        './build/'
                // here we use a globbing pattern to match everything inside the `mobile` folder
                //'dist/mobile/**/*',
                // we don't want to clean this file though so we negate the pattern
                //'!dist/mobile/deploy.json'
    ]);
});

/**
 * copy the html stuff minus css and js
 */
gulp.task('copy-assets', ['clean'],function () {
    gulp.src('./**/*', {base: './public_html'})
            .pipe(gulp.dest('./build/'));
});




gulp.task('build', ['clean', 'bundle-js','copy-assets']);