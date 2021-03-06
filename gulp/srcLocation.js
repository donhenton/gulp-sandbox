/**
 * 
 * @type Module gulp|Module gulp
 * the various definitions of source locations and the tasks assoicated 
 * with knowing the structure of the website 
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var conf = require('./conf');


/**
The use of '_' in the scss file names apparently prevents them 
from being picked up by the sass processor. if that wasn't the case, they
would have their contents added to style.css

*/
gulp.task('copy-css', function () {
     
    gulp.src('./src/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./build/css'));


});

gulp.task('copy-html', function () {
    gulp.src('**/*', {base: './public_html'})
            .pipe(gulp.dest('./build/'));


});



gulp.task('copy-images', function () {

    gulp.src('src/images/**/*')
            .pipe(gulp.dest('./build/images'));

});

/**
 * copy the html stuff minus css and js
 */
gulp.task('copy-assets', ['copy-html', 'copy-images', 'copy-css'], function () {


});

gulp.task('watch-assets', function () {
    gulp.watch('./public_html/**/*.html', ['copy-html']);
    gulp.watch(['./src/sass/style.scss','./src/sass/resources/*.scss'], ['copy-css']);
    gulp.watch('./src/images/*.*', ['copy-images']);
});

/**
 * where are javascript is located and what to do with browserify
 * @type type. this is definition of what javascript files to process
 */
exports.jsSrc = {
    entries: ['./src/js/main.js'],
    debug: conf.env === 'dev',
    cache: {},
    noParse: ['./node_modules/jquery/dist/jquery.js'],
    packageCache: {},
    fullPaths: true
};