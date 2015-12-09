var notifier = require('node-notifier');
var gulp = require('gulp');
var css = require('./css');

/**
 * error notification function
 * @param {type} error
 * @returns {undefined}
 */
exports.notify = function (error) {
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

 

function isOnlyChange(event) {
    return event.type === 'changed';
}
 


exports.browserSync = require('browser-sync').create();

gulp.task('serve', function () {
  
    exports.browserSync.init({
        server: {
            baseDir: 'build'
        }
    });
    gulp.watch('public_html/**/*.html', function (event) {
        if (isOnlyChange(event)) {
            gulp.start('copy-html');
            exports.browserSync.reload;
            // console.log(json3.stringify(event));
        }
    });
    gulp.watch('src/css/**/*.*', function (event) {

          css.loadCss().pipe(exports.browserSync.stream())

    });
    gulp.watch('src/images/**/*.*', function (event) {
        gulp.start('copy-images');
        exports.browserSync.reload;

    });
    gulp.watch('src/js/**/*.*', ['watch-bundle-js']);
});