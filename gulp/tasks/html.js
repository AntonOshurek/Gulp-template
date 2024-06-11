//SERVER
import browserSync from "browser-sync";
//HTML
import htmlmin from "gulp-htmlmin";
import { htmlValidator } from "gulp-w3c-html-validator";
import bemlinter from "gulp-html-bemlinter";
//OPTIMIZE UTILS
import sitemap from "gulp-sitemap";

export const html = () => {
	return app.gulp
		.src([`${app.paths.base.srcFolder}/**/*.html`])
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(app.gulp.dest(app.paths.base.buildFolder))
		.pipe(app.gulp.dest("./app"))
		.pipe(browserSync.stream());
};

const siteAddress = "https://www.example.com/";

export const htmlBuild = () => {
	return app.gulp
		.src([`${app.paths.base.srcFolder}/**/*.html`])
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(app.gulp.dest(app.paths.base.buildFolder))
		.pipe(
			sitemap({
				siteUrl: siteAddress,
				changefreq: "monthly",
				priority: function (siteUrl, loc, entry) {
					const prior = () => {
						if (loc.toString() === siteAddress) {
							return 1;
						} else if (loc.split(siteAddress).length > 0) {
							return 0.9;
						}
					};
					return prior();
				},
			})
		)
		.pipe(app.gulp.dest("./app"))
		.pipe(browserSync.stream());
};

//html tests
export const validateMarkup = () => {
	return src(`${app.paths.base.srcFolder}/**/*.html`)
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }));
};

export const lintBemMarkup = () => {
	return src(`${app.base.srcFolder}/**/*.html`).pipe(bemlinter());
};
