//SERVER
import browserSync from "browser-sync";

//UTILS
import notify from "gulp-notify";
import rename from "gulp-rename";

//STYLES
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import postcss from "gulp-postcss"; /* for run all tasks */
import cssnano from "cssnano"; /* minify css */
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "autoprefixer";
const sass = gulpSass(dartSass);

export const styles = () => {
	return app.gulp
		.src(app.paths.srcStyles)
		.pipe(
			plumber(
				notify.onError({
					title: "SCSS",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(
			postcss([
				autoprefixer({
					cascade: false,
					grid: true,
					overrideBrowserslist: ["last 20 versions"],
				}),
				cssnano(),
			])
		)
		.pipe(rename("style.min.css"))
		.pipe(sourcemap.write("."))
		.pipe(app.gulp.dest(app.paths.buildCssFolder))
		.pipe(browserSync.stream());
};
