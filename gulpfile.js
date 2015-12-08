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
var watch  = require('gulp-watch');
var watchify  = require('watchify');


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
    var b =  bundler
            .bundle()
            .on('error', notify)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(env === 'prod', uglify()))
            .pipe(gulp.dest('./build/js'));
    
    return b;
}

bundler.on("update",bundle);

gulp.task('bundle-js', ['clean','copy-assets'], function ( ) {
    
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
gulp.task('copy-assets', ['clean'], function () {
    gulp.src('**/*', {base: './public_html'})
            .pipe(gulp.dest('./build/'));
    gulp.src('src/css/**/*.css')
            .pipe(gulp.dest('./build/css'));
    gulp.src('src/images/**/*')
            .pipe(gulp.dest('./build/images'));

});




//gulp.task('build', ['clean', 'bundle-js', 'copy-assets']);
gulp.task('build', ['clean','copy-assets', 'bundle-js'  ]);