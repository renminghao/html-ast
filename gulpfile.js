var gulp = require('gulp');
var babel = require('gulp-babel');

var babel_config = {
	presets : ['es2015','stage-0'],
	plugins : ['transform-async-to-generator']
}

gulp.task('js',function (){
	return gulp.src(['lib/**/*.js'])
			.pipe(babel(babel_config))
			.pipe(gulp.dest('dist'));
})

gulp.task('test',function (){
	return gulp.src(['test/**/*.js'])
			.pipe(babel(babel_config))
			.pipe(gulp.dest('build'));
})

gulp.task('copy', function () {
	return gulp.src(['test/**/*.ept'])
			.pipe(gulp.dest('build'))
})

gulp.task('default',['js','test','copy'], function (){})