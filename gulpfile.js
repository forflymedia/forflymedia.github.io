/* eslint-disable */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var paths = {
  styles: {
    src: './scss/**/*.scss',
  },
  scripts: {
    src: './js/**/*.js',
  },
};

gulp.task('sass',async function(){
  gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(
        autoprefixer({
          cascade: false,
        }),
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./css'));
})

gulp.task('default', function () {
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch('*.html').on("change", reload);
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});