# Gulp Project Template

This is a Gulp project template for web development that utilizes Gulp, Webpack, and various plugins to streamline the development process. It provides tasks for building, optimizing, and serving web projects.

## Installation

Before using the project template, ensure that you have Node.js installed on your machine. Then, follow these steps:

- **Clone the project repository.**

- **Navigate to the project directory.**

- **Install the project dependencies by running the following command:**

```
npm install
```

## Usage

The project template includes several Gulp tasks that you can use for different purposes. Here are the available scripts defined in the package.json file:

- **npm test: Runs the following tasks:**
  - **gulp validateMarkup: Validates HTML markup using W3C HTML validator.**
  - **gulp lintBemMarkup: Lints HTML markup using the BEM methodology.**
  - **stylelint "src/styles/**/\_.less" --custom-syntax postcss-less: Lints LESS stylesheets using stylelint.\*\*
- **npm build: Builds the project for production by running the gulp runBuild task.**
- **npm start: Runs the project in development mode by executing the gulp runDev task.**

Feel free to modify these scripts in the package.json file to fit your specific project requirements.

# File Structure

The project template follows a specific file structure:

- **src/: Contains the source files for the project.**
  - **styles/: Contains LESS stylesheets.**
  - **img/: Contains image files.**
  - **fonts/: Contains font files.**
  - **scripts/: Contains JavaScript files.**
- **app/: The build folder where the processed and optimized files are generated.**

## Gulp Plugins and Dependencies

The project template utilizes several Gulp plugins and dependencies to perform various tasks. Here are some of the key plugins used:

- **gulp: The Gulp task runner.**
- **browser-sync: A development server that allows live reloading.**
- **gulp-html-bemlinter: A plugin for linting HTML markup using the BEM methodology.**
- **gulp-htmlmin: A plugin for minifying HTML files.**
- **gulp-less: A plugin for compiling LESS stylesheets.**
- **gulp-notify: A plugin for displaying notifications during the Gulp tasks.**
- **gulp-postcss: A plugin for transforming CSS with JavaScript and PostCSS.**
- **gulp-rename: A plugin for renaming files.**
- **gulp-sourcemaps: A plugin for generating sourcemaps.**
- **gulp-w3c-html-validator: A plugin for validating HTML markup using the W3C HTML validator.**
- **gulp-sitemap: A plugin for generating sitemaps.**
- **stylelint: A linter for CSS and LESS stylesheets.**
- **webpack: A module bundler for JavaScript.**
- **webpack-stream: A Gulp plugin for using Webpack within Gulp tasks.**

  For a complete list of dependencies, please refer to the devDependencies section in the package.json file.

## Customization

Feel free to modify the Gulp tasks, configuration, and file structure to suit your specific project needs. The Gulp tasks are defined in the gulpfile.js file, and you can make changes there as required.

## License

This project template is open source and available under the ISC License. You are free to use, modify, and distribute it according to the terms of the license.
