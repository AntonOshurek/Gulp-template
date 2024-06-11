//SERVER
import browserSync from "browser-sync";

import gulp from "gulp";
import { paths } from "./gulp/config/paths.js";

//tasks
import { styles } from "./gulp/tasks/styles.js";
import {
	lintBemMarkup,
	validateMarkup,
	htmlBuild,
	html,
} from "./gulp/tasks/html.js";
import { scripts } from "./gulp/tasks/script.js";
import { copyImages } from "./gulp/tasks/images.js";
import { clean, copy } from "./gulp/tasks/utils.js";

global.app = {
	gulp,
	paths,
	isProd: false,
};

const { src, dest, series, watch, parallel } = gulp;

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
	watch(`${paths.base.srcFolder}/scripts/**/*.js`, series(scripts));
};

const toProd = (done) => {
	app.isProd = true;
	done();
};

export function runBuild(done) {
	series(toProd, clean)(done);
	parallel(htmlBuild, styles, scripts, copyImages, copy)(done);
}

export function runDev(done) {
	series(clean, copyImages, copy, html, styles, scripts)(done);
	series(startServer, watchFiles)(done);
}

export { lintBemMarkup, validateMarkup }; //used in testing npm commands in package.json file
