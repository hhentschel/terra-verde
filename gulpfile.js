/**
 * Gulpfile
 * @source http://craftsnippets.com/starter-theme-for-craft-cms
 * @source https://www.npmjs.com/package/line-reader (for reading ROOT_URL from env file)
 */

/**
 * IMPORTS
 */
const lineReader = require('line-reader');
const fs = require('fs');
const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const gulpStylelint = require('gulp-stylelint');

const browserSync = require('browser-sync').create();

const browserify = require('browserify');
const babelify = require('babelify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const gulpPlumber = require('gulp-plumber');

const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const extReplace = require('gulp-ext-replace');

/**
 * LOCAL VARIABLES
 */
const envFile = '.env';

const jsMainFile = 'main.js';
const jsDestFolder = 'web/assets/scripts/';
const jsDevFolder = 'src/scripts/';
const jsDevFolderWatch = `${jsDevFolder}**/*.js`;

const cssMainFile = 'main.css';
const cssMainMinFile = 'main.min.css';
const scssMainFile = 'main.scss';
const scssDestFolder = 'web/assets/styles/';
const scssDevFolder = 'src/styles/';
const scssDevFolderWatch = `${scssDevFolder}**/*.scss`;

const templatesFolderWatch = 'templates/**/*.twig';

/**
 * TASKS
 */

/* CLEAN UP */

// clean style dest folder
function cleanCssFolder() {
  return gulp.src(`${scssDestFolder}**/*`, { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
}

// remove main css file in style dest folder
function removeMainCss() {
  return gulp.src(scssDestFolder + cssMainFile, { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
}

// clean script dest folder
function cleanJsFolder() {
  return gulp.src(`${jsDestFolder}**/*`, { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
}

/* JAVASCRIPT */
// lints javascript
function esLint() {
  return gulp.src([jsDevFolderWatch])
    .pipe(gulpPlumber()) // prevents watch from breaking due to scss errors in stylelint
    .pipe(eslint())
    .pipe(eslint.format());
}

// produces main.js and sourcemap
function jsDev() {
  return browserify({
    entries: [jsDevFolder + jsMainFile],
  })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source(jsMainFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDestFolder))
    .pipe(browserSync.stream());
}

// produces main.min.js file and sourcemap
function jsProd() {
  return browserify({
    entries: [jsDevFolder + jsMainFile],
  })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source(jsMainFile))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDestFolder))
    .pipe(browserSync.stream());
}


/* CSS */

// lint css
function cssLint() {
  return gulp.src(scssDestFolder)
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true },
      ],
    }));
}

// generate css from sass
function cssGenerate() {
  return gulp.src(scssDevFolder + scssMainFile)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scssDestFolder))
    .pipe(browserSync.stream());
}

// generate minified css
function cssMinify() {
  return gulp.src([
    scssDestFolder + cssMainFile,
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(cssMainMinFile))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(scssDestFolder))
    .pipe(removeMainCss());
}

/* BROWSER */

// browser sync
function browserSyncTask() {
  return new Promise((resolve) => {
    const filePath = __dirname;
    filePath.split('localhost');

    lineReader.eachLine(envFile, (line) => {
      if (line.includes('ROOT_URL')) {
        const rootUrl = line.replace('ROOT_URL=', '').replace(/"/g, '').replace(/'/, '');

        browserSync.init({
          proxy: rootUrl,
        });
      }
      resolve();
    });
  });
}

/* WATCH */
function watchDevFiles() {
  return new Promise((resolve) => {
    gulp.watch(scssDevFolderWatch, gulp.series(cssGenerate, cssLint));
    gulp.watch(jsDevFolderWatch, gulp.series(esLint, jsDev));
    gulp.watch(templatesFolderWatch).on('change', gulp.series(browserSync.reload));
    resolve(); // always signal async completion (for last task not needed)
  });
}

/* ENVIRONMENT */

// changes dev mode in env file
function setEnvDevMode(dev = true) {
  return new Promise((resolve) => {
    fs.readFile(envFile, 'utf8', (readErr, data) => {
      if (readErr) {
        resolve();
      }
      const newDevModeString = `DEV_MODE="${dev ? 'true' : 'false'}"`;
      const result = data.replace(/(DEV_MODE=")(.){0,}?"/g, newDevModeString);

      fs.writeFile(envFile, result, 'utf8', () => {
        resolve();
      });
    });
  });
}

/**
 * MAIN TASKS
 */

/* dev */
gulp.task('dev', gulp.series(
  () => setEnvDevMode(true),
  cleanJsFolder,
  cleanCssFolder,
  cssGenerate,
  cssLint,
  esLint,
  jsDev,
  browserSyncTask,
  watchDevFiles,
));

/* prod */
gulp.task('prod', gulp.series(
  () => setEnvDevMode(false),
  cleanJsFolder,
  cleanCssFolder,
  cssGenerate,
  cssLint,
  cssMinify,
  esLint,
  jsProd,
  browserSyncTask,
));

gulp.task('exportWebP', () => {
  const src = 'web/assets/images/content/products/wine/*/*.'; // Where your PNGs are coming from.
  const dest = 'web/assets/images/content/products/winepng/'; // Where your WebPs are going.

  return gulp.src(src)
    .pipe(imagemin([
      webp({
        quality: 75,
      }),
      mozjpeg({
        quality: 75,
        progressive: true,
      }),
      optipng({
        optimizationLevel: 5,
      }),
    ]))
    .pipe(extReplace('.png'))
    .pipe(gulp.dest(dest));
});

/* default */
gulp.task('default', gulp.task('dev'));
