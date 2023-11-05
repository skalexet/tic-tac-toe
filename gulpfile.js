/**
 * @TypeScript
 * The following gulp code appeared to be after migration from javascript codebase
 */

/** Modules Import*/
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const terser = require('gulp-terser');
const buffer = require("vinyl-buffer");

/** Paths */
const paths = {pages: ["src/*.html", "src/*.css", "src/main.ts"]};

/** Copying hypertext to dist */
gulp.task('copy-html', function () {
  return gulp.src(paths.pages[0])
  .pipe(concat('index.html'))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist'));
});

/** Minify css */
gulp.task('minify-css', function () {
  return gulp.src(paths.pages[1])
  .pipe(concat('styles.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist'));
});

/** Entry point for gulp script */
gulp.task(
  'default',
  gulp.series(
    gulp.parallel('copy-html', 'minify-css'),
    function () {
      return browserify({
        basedir: ".",
        debug: true,
        entries: [paths.pages[2]],
        cache: {},
        packageCache: {},
      })
        .plugin(tsify)
        .transform("babelify", {
          presets: ["es2015"],
          extensions: [".ts"],
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(terser())
        .pipe(gulp.dest("dist"));
    }
  )
);
