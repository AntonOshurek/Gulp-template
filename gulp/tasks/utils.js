import { deleteSync } from "del";

// Copy
export const copy = (done) => {
	app.gulp
		.src(
			[
				`${app.paths.srcFontsFolder}/**/*.{woff2,woff}`,
				`${app.paths.base.srcFolder}/*.ico`,
				`${app.paths.base.srcFolder}/manifest.webmanifest`,
			],
			{
				base: app.paths.base.srcFolder,
			}
		)
		.pipe(app.gulp.dest(app.paths.base.buildFolder));
	done();
};

//Clean
export const clean = async () => {
	return await deleteSync([app.paths.base.buildFolder]);
};
