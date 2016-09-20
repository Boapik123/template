var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch("app/less/*.less", ['less']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src("app/less/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
