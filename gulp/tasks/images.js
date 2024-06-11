import gulpif from "gulp-if";
import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";

// newer a Gulp plugin for passing through only those source files that are newer than corresponding destination files.
// newer плагин Gulp для передачи только тех исходных файлов, которые новее соответствующих файлов назначения.

export const copyImages = () => {
	return app.gulp
		.src([`${app.paths.srcImgFolder}/**/*.{png,jpg,svg,webp}`], {
			encoding: false,
		})
		.pipe(newer(app.paths.buildImgFolder))
		.pipe(
			gulpif(
				app.isProd,
				imagemin([
					gifsicle({ interlaced: true }),
					mozjpeg({ quality: 75, progressive: true }),
					optipng({ optimizationLevel: 2 }),
				])
			)
		)
		.pipe(app.gulp.dest(`${app.paths.buildImgFolder}`));
};

export const createWebp = () => {
	return app.gulp
		.src([`${app.paths.srcImgFolder}/**/*.{png,jpg,webp}`], {
			encoding: false,
		})
		.pipe(webp({ quality: 75 }))
		.pipe(app.gulp.dest(`${app.paths.buildImgFolder}`));
};
