
/*
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');


var notifier = require('node-notifier');
var concat = require('gulp-concat');
var del = require('del');



//var watch = require('gulp-watch');


var json3 = require('json3')

*/


var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var conf = require('./conf');
var sync = require('./sync');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');




/**
 * function that will watch and package up via browswerify, there 
 * will need to be require statements in you js code see src/js/main.js
 * @type type
 */

var watchBundler = watchify(browserify(conf.jsSrc));


/**
 * on update function for watchify. 
 * @param {type} f file responsible for triggering change
 * @returns {unresolved}
 */
function watchBundle(f) {

    var b = watchBundler
            .bundle()
            .on('error', sync.notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(conf.env === 'prod', uglify()))
            .pipe(gulp.dest('./build/js'));

    return b;
}

watchBundler.on("update", watchBundle);

/**
 * bundle up js and notify browser watch
 * @param {type} param1
 * @param {type} param2
 */
gulp.task('watch-bundle-js', function ( ) {

    watchBundle().pipe(sync.browserSync.stream());
});

gulp.task('bundle-js', function ( ) {
    //var bb = browserify(jsSrc);
   browserify(conf.jsSrc).bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(conf.env === 'prod', uglify()))
            .pipe(gulp.dest('./build/js'));
});

