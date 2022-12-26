import gulp from 'gulp';
//SERVER
import browserSync from 'browser-sync';
//UTILS
import rename from 'gulp-rename';
// import del from 'del';
import {deleteSync} from 'del';
import notify from 'gulp-notify';
//HTML
import htmlmin from 'gulp-htmlmin';
import { htmlValidator } from "gulp-w3c-html-validator";
//STYLES
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';

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
				overrideBrowserslist: ["last 20 versions"]
			}),
      csso() //minify css
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(dest(paths.buildCssFolder))
    .pipe(browserSync.stream());
};

//HTML
export const html = () => {
  return src([`${srcFolder}/**/*.html`])
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(buildFolder))
	.pipe(browserSync.stream());
};

export function validateMarkup() {
	return src(`${srcFolder}/**/*.html`)
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }))
}

//IMAGES
//copyimg
export const copyImages = () => {
  return gulp.src(`${paths.srcImgFolder}/**/*.{png,jpg,svg}`)
  .pipe(gulp.dest(`${paths.buildImgFolder}`))
}

//Clean
export const clean = async () => {
  return await deleteSync([buildFolder]);
};

//SERVER
export function startServer (done) {
	browserSync.init({
		server: {
			baseDir: [buildFolder]
		},
		cors: true,
		notify: false,
		ui: false,
	});
	done();
};

function reloadServer (done) {
	browserSync.reload();
	done();
};

function watchFiles () {
	watch([`${srcFolder}/less/**/*.less`], series(stylesLESS));
	watch(`${srcFolder}/*.html`, series(html, reloadServer));
}

//SCRIPTS build and developer server
export function runBuild (done) {
	series(
		clean,
	)(done)
	parallel(
		html,
		stylesLESS,
		copyImages,
	)(done);
}

export function runDev (done) {
	series(
		runBuild,
		startServer,
		watchFiles
	)(done);
}
