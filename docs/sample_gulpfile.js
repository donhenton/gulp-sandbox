/*globals require*/
/*jslint node: true */
'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var replace = require('gulp-html-replace');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var sync = require('browser-sync');
// env vars https://www.youtube.com/watch?v=gRzCAyNrPV8&list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm&index=4
//http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
var del = require('del');

gulp.task('clean', function (cb) {
	del(['dist/css', 'dist/js', 'dist/*.html'], cb);
});

gulp.task('less', ['clean'], function () {
	return gulp.src('app/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html', function () {
	return gulp.src('app/index.html')
		.pipe(replace({
			js: 'js/app.js'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['concat'], function () {
	return gulp.src('dist/js/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('concat', function () {
	return gulp.src(['app/scripts/utils.js', 'app/scripts/main.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('serve', function () {
	sync({
		server: {
			baseDir: 'app'
		}
	});
	
	gulp.watch('app/less/*.less', ['less', sync.reload]);
	gulp.watch(['app/index.html', 'app/scripts/*.js'], sync.reload);
});

gulp.task('default', ['clean', 'less', 'concat', 'uglify', 'html']);