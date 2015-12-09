var notifier = require('node-notifier');
var gulp = require('gulp');
var gutil = require('gulp-util');
var css = require('./srcLocation');
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



function isOnlyChange(event) {
    return event.type === 'changed';
}



gulp.task('serve', function (done) {
    gulp.src('build').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: true,
                        
                        open: true

                    }



            ));
});

/*
 * {
 livereload: {
 enable: true,
 directoryListing: true,
 filter: function (filePath, cb) {
 if (/main.js/.test(filePath)) {
 cb(true)
 } else if (/style.css/.test(filePath)) {
 cb(true)
 }
 }
 },
 open: true
 }
 */