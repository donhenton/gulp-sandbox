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
var sync = require('browser-sync');


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
var env = process.env.NODE_ENV;
if (!env)
{
    env = 'dev';
}

var bundler = watchify(browserify({
    entries: ['./src/js/main.js'],
    debug: env === 'dev',
    cache: {},
    noParse: ['./node_modules/jquery/dist/jquery.js'],
    packageCache: {},
    fullPaths: true
}));



function bundle(f) {
    console.log(f);
    var b = bundler
            .bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(env === 'prod', uglify()))
            .pipe(gulp.dest('./build/js'));

    return b;
}

bundler.on("update", bundle);

gulp.task('bundle-js', function ( ) {

    bundle().pipe(sync.stream());
});


gulp.task('clean', function () {
    var paths = 
      del.sync(['build']);
      // console.log('del\n'+paths.join('\n'));
});

/**
 * copy the html stuff minus css and js
 */
gulp.task('copy-assets', ['copy-html','copy-images','copy-css'], function () {
     

});

gulp.task('copy-html',   function () {
    gulp.src('**/*', {base: './public_html'})
            .pipe(gulp.dest('./build/')).pipe(sync.stream());;
     

});

gulp.task('copy-css',   function () {
     
    gulp.src('src/css/**/*.css')
            .pipe(gulp.dest('./build/css'));
     

});

gulp.task('copy-images',   function () {
    
    gulp.src('src/images/**/*')
            .pipe(gulp.dest('./build/images'));

});

/* ----------------------- watch --------------------------- */

function isOnlyChange(event) {
    return event.type === 'changed';
}
/* ----------------------- watch --------------------------- */

gulp.task('serve', function () {
    sync({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch('public_html/**/*.*', ['copy-html']);
    gulp.watch('src/css/**/*.*', ['copy-css', sync.reload]);
    gulp.watch('src/images/**/*.*', ['copy-images', sync.reload]);
    gulp.watch('src/js/**/*.*', ['bundle-js', sync.reload]);
    
});



//gulp.task('build', ['clean', 'bundle-js', 'copy-assets']);
gulp.task('build', ['clean', 'copy-assets','bundle-js', 'serve']);