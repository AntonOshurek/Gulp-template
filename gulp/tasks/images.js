export const copyImages = () => {
	return app.gulp
		.src(`${app.paths.srcImgFolder}/**/*.{png,jpg,svg,webp}`)
		.pipe(app.gulp.dest(`${app.paths.buildImgFolder}`));
};
