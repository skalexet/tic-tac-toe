const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

function buildAll(cb) {
  gulp.src('*.html')
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dist/'));

  gulp.src('src/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));

  gulp.src('src/*.js')
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/'));

  cb();
}

gulp.task('default', buildAll);