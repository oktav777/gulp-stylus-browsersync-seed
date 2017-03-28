const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const nib = require('nib');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');

const paths = {
  jsAll: ['./js/*.js', './js/**/*.js'],
  stylusEntry: ['./stylus/_main.styl'],
  stylusAll: ['./stylus/*.styl', './stylus/**/*.styl'],
  htmlEntry: ['./index.html'],
};

gulp.task('stylus', function () {
  gulp.src(paths.stylusEntry)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      compress: true,
      linenos: false,
      use: nib()
    }))
    //.pipe(autoprefixer({
    //   browsers: ['last 5 versions'],
    //   cascade: false
    //}))
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});


gulp.task('browser-sync', function () {
  browserSync({
    // ghostMode: false,
    port: 3000,
    server: {
      baseDir: '.',
    }
  });
});


gulp.task('watch', function () {
  gulp.watch(paths.jsAll, reload);
  gulp.watch(paths.htmlEntry, reload);
  gulp.watch(paths.stylusAll, ['stylus']);
});


gulp.task('default', ['browser-sync', 'stylus', 'watch']);
