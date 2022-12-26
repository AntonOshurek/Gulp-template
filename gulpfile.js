import gulp from 'gulp';

//SERVER
import browserSync from 'browser-sync';
//UTILS
import rename from 'gulp-rename';
import del from 'del';
import notify from 'gulp-notify';
//HTML
import htmlmin from 'gulp-htmlmin';
//STYLES
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import  autoprefixer from 'autoprefixer';

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

const {
  src,
  dest,
  series,
  watch,
	parallel,
} = gulp;

browserSync.create();

// Styles
export const stylesLESS = () => {
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
};

//HTML
export const html = () => {
  return src([`${srcFolder}/*.html`])
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(buildFolder))
	// .pipe(dest(buildFolder))
	// .pipe(browserSync.stream());
};

//Clean
export const clean = () => {
  return del([buildFolder]);
};

// Build
export const build = series(
  clean,
  // copy,
  parallel(
    stylesLESS,
    html,
    // createWebp,
    // script,
  ),
);
