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
var gulpif = require('gulp-if')
//var watch = require('gulp-watch');
var watchify = require('watchify');
var sync = require('browser-sync').create();
var json3 = require('json3')

/**
 * error notification function
 * @param {type} error
 * @returns {undefined}
 */
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

/**
 * set the env environment variable this can be passed into the command
 * for prod vs dev env
 * @type process.env.NODE_ENV|String
 */
var env = process.env.NODE_ENV;
if (!env)
{
    env = 'dev';
}

/**
 * where are javascript is located and what to do with browserify
 * @type type
 */
var jsSrc = {
    entries: ['./src/js/main.js'],
    debug: env === 'dev',
    cache: {},
    noParse: ['./node_modules/jquery/dist/jquery.js'],
    packageCache: {},
    fullPaths: true
};

 
/**
 * function that will watch and package up via browswerify, there 
 * will need to be require statements in you js code see src/js/main.js
 * @type type
 */

var watchBundler = watchify(browserify(jsSrc));


/**
 * on update function for watchify. 
 * @param {type} f file responsible for triggering change
 * @returns {unresolved}
 */
function watchBundle(f) {

    var b = watchBundler
            .bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(env === 'prod', uglify()))
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

    watchBundle().pipe(sync.stream());
});

gulp.task('bundle-js', function ( ) {
    //var bb = browserify(jsSrc);
   browserify(jsSrc).bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(env === 'prod', uglify()))
            .pipe(gulp.dest('./build/js'));
});



gulp.task('clean', function () {

    del.sync(['build']);
     
});

/**
 * copy the html stuff minus css and js
 */
gulp.task('copy-assets', ['copy-html', 'copy-images', 'copy-css'], function () {


});

gulp.task('copy-html', function () {
    gulp.src('**/*', {base: './public_html'})
            .pipe(gulp.dest('./build/'));


});

function loadCss()
{
    return gulp.src('src/css/**/*.css').pipe(gulp.dest('./build/css'));
}


gulp.task('copy-css', function () {

   loadCss();

//.pipe(sync.stream())
});

gulp.task('copy-images', function () {

    gulp.src('src/images/**/*')
            .pipe(gulp.dest('./build/images'));

});


/* ----------------------- watch --------------------------- */

function isOnlyChange(event) {
    return event.type === 'changed';
}
/* ----------------------- watch --------------------------- */

gulp.task('serve', function () {
    sync.init({
        server: {
            baseDir: 'build'
        }
    });
    gulp.watch('public_html/**/*.html', function (event) {
        if (isOnlyChange(event)) {
            gulp.start('copy-html');
            sync.reload;
            // console.log(json3.stringify(event));
        }
    });
    gulp.watch('src/css/**/*.*', function (event) {

          loadCss().pipe(sync.stream())

    });
    gulp.watch('src/images/**/*.*', function (event) {
        gulp.start('copy-images');
        sync.reload;

    });
    gulp.watch('src/js/**/*.*', ['watch-bundle-js']);
});

gulp.task('build-serve', ['clean', 'copy-assets', 'watch-bundle-js', 'serve']);
gulp.task('build', ['clean', 'copy-assets','bundle-js']);