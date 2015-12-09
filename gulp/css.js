var gulp = require('gulp');

exports.loadCss = function ()
{
    return gulp.src('src/css/**/*.css').pipe(gulp.dest('./build/css'));
};


gulp.task('copy-css', function () {

    exports.loadCss();

//.pipe(sync.stream())
});