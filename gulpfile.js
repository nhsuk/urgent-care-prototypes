'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
 
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/assets/css'));
});

function styles() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/assets/css'))
    .on('error', (err) => {
      console.log(err)
      process.exit(1)
    })
}

function watch() {
  gulp.watch('app/styles/*.scss');
}

exports.styles = styles;
exports.watch = watch;

gulp.task('build', styles);
gulp.task('default', watch);