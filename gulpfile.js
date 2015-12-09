/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var conf = require('./gulp/conf');
var gulp = require('gulp');
var del = require('del');


var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});





 


gulp.task('clean', function ( ) {

    del.sync(['build'] );
     
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



gulp.task('copy-images', function () {

    gulp.src('src/images/**/*')
            .pipe(gulp.dest('./build/images'));

});






gulp.task('build-serve', ['clean', 'copy-assets', 'watch-bundle-js', 'serve']);
gulp.task('build', ['clean', 'copy-assets','bundle-js']);