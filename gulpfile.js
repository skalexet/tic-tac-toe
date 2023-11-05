const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function buildAll(cb) {
  gulp.src('*.html')
    .pipe(concat('index.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));

  gulp.src('src/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));

  gulp.src('src/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/'));

  cb();
}

gulp.task('default', buildAll);
