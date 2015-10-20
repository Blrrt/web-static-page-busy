'use strict';

var autoprefixer = require('gulp-autoprefixer');
var cssBase64 = require('gulp-css-base64');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var inlineSource = require('gulp-inline-source');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var responsive = require('gulp-responsive');
var stylus = require('gulp-stylus');
var ttf2woff = require('gulp-ttf2woff');
var uglify = require('gulp-uglify');

gulp.task('build', ['css', 'fonts', 'html', 'images', 'js'],
  function () {
    return gulp.src('build/index.html')
      .pipe(gulp.dest('dist'));
  }
);

gulp.task('css', ['fonts'], function () {
  return gulp.src('lib/index.stylus')
    .pipe(stylus())
    .pipe(cssBase64({
      baseDir: 'build',
      maxWeightResource: Infinity
    }))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function () {
  return gulp.src('lib/SupriaSans-Regular.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('build'));
});

gulp.task('html', ['css', 'images', 'js'], function () {
  return gulp.src('lib/index.html')
    .pipe(inlineSource({
      rootpath: 'build',
      svgAsImage: true
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('images', ['image'], function () {
  return gulp.src(['build/image.jpg', 'lib/logo.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('build'));
});

gulp.task('image', function () {
  return gulp.src('lib/image.jpg')
    .pipe(responsive([{
      name: 'image.jpg',
      height: 320
    }]))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return gulp.src('lib/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
