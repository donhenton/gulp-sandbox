var notifier = require('node-notifier');
var gulp = require('gulp');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');

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



gulp.task('serve', function (done) {
    gulp.src('build').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: true,
                        
                        open: true

                    }



            ));
});

