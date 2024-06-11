const srcFolder = "./src";
const buildFolder = "./app";

export const paths = {
	base: {
		srcFolder: srcFolder,
		buildFolder: buildFolder,
	},
	srcStyles: `${srcFolder}/styles/index.scss`,
	srcSvg: `${srcFolder}/img/svg/**.svg`,
	srcImgFolder: `${srcFolder}/images`,
	srcFullJs: `${srcFolder}/scripts/**/*.js`,
	srcMainJs: `${srcFolder}/scripts/index.js`,
	srcFontsFolder: `${srcFolder}/fonts`,
	buildJsFolder: `${buildFolder}/scripts`,
	buildCssFolder: `${buildFolder}/styles`,
	buildImgFolder: `${buildFolder}/images`,
};
