import browserSync from "browser-sync";
import fileInclude from "gulp-file-include";
import typograf from "gulp-typograf";

export function htmlInclude() {
	return app.gulp
		.src([`${app.paths.base.srcFolder}/*.html`])
		.pipe(
			fileInclude({
				prefix: "@",
				basepath: "@file",
				maxRecursion: 100,
			})
		)
		.pipe(
			typograf({
				locale: ["ru", "en-US"],
			})
		)
		.pipe(app.gulp.dest(app.paths.base.buildFolder))
		.pipe(browserSync.stream());
}
