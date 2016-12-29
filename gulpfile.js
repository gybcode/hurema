var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

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
