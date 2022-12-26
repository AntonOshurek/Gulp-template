const {
  src,
  dest,
  series,
  watch,
	parallel,
} = require('gulp');

//SERVER
const browserSync = require('browser-sync').create();
//UTILS
const rename = require('gulp-rename');
const del = require('del');
const notify = require('gulp-notify');
//HTML
const htmlmin = require('gulp-htmlmin');
//STYLES
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const  autoprefixer = require('autoprefixer');

// paths
const srcFolder = './src';
const buildFolder = './app';
const paths = {
  srcStyles: `${srcFolder}/styles/index.less`,
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/images`,
  srcFullJs: `${srcFolder}/scripts/**/*.js`,
  srcMainJs: `${srcFolder}/scripts/index.js`,
  buildJsFolder: `${buildFolder}/scripts`,
  buildCssFolder: `${buildFolder}/styles`,
  buildImgFolder: `${buildFolder}/images`,
  // srcPartialsFolder: `${srcFolder}/partials`,
  // resourcesFolder: `${srcFolder}/resources`,
};

// Styles
const stylesLESS = () => {
  return src(paths.srcStyles)
    .pipe(plumber(
			notify.onError({
        title: "LESS",
        message: "Error: <%= error.message %>"
      })
		))
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
				cascade: false,
				grid: true,
				overrideBrowserslist: ["last 5 versions"]
			}),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(dest(paths.buildCssFolder))
    .pipe(browserSync.stream());
}
exports.stylesLESS = stylesLESS;


//HTML
const html = () => {
  return src([`${srcFolder}/*.html`])
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(buildFolder))
	// .pipe(dest(buildFolder))
	// .pipe(browserSync.stream());
};
exports.html = html;

//Clean
const clean = () => {
  return del([buildFolder]);
};
exports.clean = clean;

// Build
const build = series(
  clean,
  // copy,
  parallel(
    stylesLESS,
    html,
    // createWebp,
    // script,
  ),
);
exports.build = build;
