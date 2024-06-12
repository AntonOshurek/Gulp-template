import gulp from "gulp";

//SERVER
import browserSync from "browser-sync";

//VARIABLES
import { paths } from "./gulp/config/paths.js";

//TASKS
import { styles } from "./gulp/tasks/styles.js";
import { lintBemMarkup, htmlBuild, html } from "./gulp/tasks/html.js";
import { scripts } from "./gulp/tasks/script.js";
import { copyImages, createWebp } from "./gulp/tasks/images.js";
import { clean, copy } from "./gulp/tasks/utils.js";
import { htmlInclude } from "./gulp/tasks/html-include.js";

global.app = {
	gulp,
	paths,
	isProd: false,
};

const { series, watch, parallel } = gulp;

browserSync.create();

const reloadServer = (done) => {
	browserSync.reload();
	done();
};

//SERVER
export const startServer = (done) => {
	browserSync.init({
		server: {
			baseDir: [paths.base.buildFolder],
		},
		cors: true,
		notify: false,
		ui: false,
		port: 3000,
	});
	done();
};

const watchFiles = () => {
	watch([`${paths.base.srcFolder}/styles/**/*.scss`], series(styles));
	watch(`${paths.base.srcFolder}/*.html`, series(html, reloadServer));
	watch(`${app.paths.srcHTMLComponentsFolder}/*.html`, htmlInclude);
	watch(`${paths.base.srcFolder}/scripts/**/*.js`, series(scripts));
	watch(
		`${paths.base.srcFolder}/images/**/*.{png,jpg,svg,webp}`,
		series(copyImages)
	);
	watch(`${paths.base.srcFolder}/images/**/*.{png,jpg}`, series(createWebp));
};

const toProd = (done) => {
	app.isProd = true;
	done();
};

export function runBuild(done) {
	series(toProd, clean)(done);
	parallel(
		htmlBuild,
		styles,
		scripts,
		copyImages,
		copy,
		createWebp,
		htmlInclude
	)(done);
}

export function runDev(done) {
	series(clean, copyImages, copy, html, styles, scripts, htmlInclude)(done);
	series(startServer, watchFiles)(done);
}

export { lintBemMarkup }; //used in testing npm commands in package.json file
