var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var nodemon = require('gulp-nodemon');

var jetpack = require('fs-jetpack');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

gulp.task('clean', function(){
	return destDir.dirAsync('.', {empty:true});
});

gulp.task('copy', function(){
	return projectDir.copyAsync('app', destDir.path(), {
		overwrite: true,
		matching: [
			'*.html',
			'./components/**/*.html'
		]
	});
});

gulp.task('build', ['copy'], function(){
	return gulp.src('./app/index.html')
		.pipe(usemin({app:[uglify()], css:[cssmin()]}))
		.pipe(gulp.dest('build/'));
});

gulp.task('nodemon', function(cb){
	var started = false;
	return nodemon({
		script: './index.js'
	}).on('start', function() {
		if(!started){
			cb();
			started = true;
		}
	});
});

gulp.task('sync', function(){
	browserSync.init(null, {
		proxy: 'localhost/hurema/app',
		browser: 'default'
	});
});

gulp.task('run', ['sync'], function(){
	gulp.watch(['./app/**']).on('change', reload);
});
