/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var conf = require('./gulp/conf');
var gulp = require('gulp');
var del = require('del');
 var Server = require('karma').Server;


var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});



gulp.task('clean', function ( ) {

    del.sync(['build','test/reports']);

});

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/test/jasmine/conf/jasmine.conf.js', 
    singleRun: true
  }, done).start();
});
/*
gulp.task('test', function(done) {
    
    
    
    
    
    
    
    karma.start({
        configFile: 'test/jasmine/conf/jasmine.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
*/

gulp.task('build-serve', ['copy-assets', 'watch-assets', 'watch-bundle-js', 'serve']);
gulp.task('build', ['clean', 'copy-assets', 'bundle-js']);


/*
 * 
 * prod vs dev build can be done at the command line
 * NODE_ENV=prod gulp build
 * NODE_ENV=dev  gulp build
 * 
 * Dev build will have minmaps for js, and the js will be uglified
 * 
 */