const path = require('path')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const postcssFilters = require('postcss-filters')
const postcssSelectorNot = require('postcss-selector-not')
const sourcemaps = require('gulp-sourcemaps')

const staticDirname = path.join('.dist', 'static')

gulp.task('css', () =>
  gulp
    .src('./src/styles/global/_index.styl')
    .pipe(sourcemaps.init())
    .pipe(
      stylus({
        compress: true,
      }),
    )
    .pipe(
      postcss([
        postcssFilters(),
        postcssSelectorNot(),
        postcssFlexbugsFixes(),
        autoprefixer({ browses: ['last 2 versions'] }),
      ]),
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(staticDirname))),
)
gulp.task('clean', () =>
  gulp.src(path.join(staticDirname), { read: false }).pipe(clean()),
)
gulp.task('css/watch', ['css'], () =>
  gulp.watch('./src/styles/**/*.styl', ['css']),
)

gulp.task('default', ['css'])
