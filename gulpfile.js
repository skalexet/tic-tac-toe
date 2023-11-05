/**
 * Modules Import
 */
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');


/**
 * Running function
 */
function buildAll(cb) {
  
  /* Minifies hypertext */
  gulp.src('*.html')
    .pipe(concat('index.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));

  /** Minifies stylesheets */
  gulp.src('src/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));

  /** Transpiles javascript 2015+ syntax into javascript 2015- syntax, minifies transpiled javascript code */
  gulp.src('src/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/'));

  /** Native callback */
  cb();
}

/** Entry point for gulp script */
gulp.task('default', buildAll);
