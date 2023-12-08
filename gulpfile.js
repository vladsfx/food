// 'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const clean = require('del');

const source = './src';
// const target = './dist';
// const server = 'C:/OSPanel/domains/food';
const target = 'C:/OSPanel/domains/food';

function browsersync() {
	browserSync.init({
		server: {
			baseDir: target,
		},
		port: 4000,
		notify: false, // Показ уведомления перезагрузки браузера
		online: true, // Работа без подключения к Интернету - false
	});
}

function scripts() {
	return src(`${source}/js/main.js`)
		.pipe(
			webpack({
				mode: 'development',
				output: {
					filename: 'script.js',
				},
				watch: false,
				devtool: "source-map",
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										[
											'@babel/preset-env', 
											{ 
												targets: 'Last 1 version, > 0.1%, not dead',
											}
										]
									],
								},
							},
						},
					],
				},
			})
		)
		.pipe(dest(`${target}/js`))
		.pipe(browserSync.stream());
}

function styles() {
	return src(`${source}/scss/style.scss`)
		.pipe(sass()).on('error', sass.logError)
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({ overrideBrowserslist: ['Last 1 version, > 0.1%, not dead'], grid: 'no-autoplace' }))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } /*, format: 'beautify'*/ }))
		.pipe(dest(`${target}/css`))
		.pipe(browserSync.stream());
}

function images() {
	return src([`${source}/img/**`],{ base: source })
		// .pipe(newer(`${target}/img`))
		.pipe(imagemin())
		.pipe(dest(target))
		.pipe(browserSync.stream());
}

function icons() {
	return src([`${source}/icons/**/*`], { base: source })
		.pipe(dest(target))
		.pipe(browserSync.stream());
}

function startwatch() {
	watch(`${source}/scss/**/*.scss`, styles);
	watch(`${source}/js/**/*.js`, scripts);
	watch(`${source}/**/*.html`, copyhtml);
	watch(`${source}/**/*.json`, copyjson);
	watch(`${source}/img/**/*`, images);
	watch(`${source}/icons/**/*`, icons);
}

function copyhtml() {
	return src([`${source}/**/*.html`], { base: source })
		.pipe(dest(target))
		.pipe(browserSync.stream());
}

function copyjson() {
	return src([`${source}/**/*.json`], { base: source })
		.pipe(dest(target));
}

const cleandist = () => clean(`${target}/**/*`, { force: true });

function cleanserver() {
	return clean(`${server}/**/*`, { force: true });
}

function copytoserver() {
	return src([
			`${target}/css/**/*.css`, 
			`${target}/js/**/*.js`, 
			`${target}/img/**/*`, 
			`${target}/icons/**/*`, 
			`${target}/**/*.html`], { base: target })
		.pipe(src([`${source}/**/*.php`, `${source}/**/*.json`], { base: source }))
		.pipe(dest(server));
}

exports.cleanserver = cleanserver;
exports.cleandist = cleandist;
exports.copyserver = series(cleanserver, copytoserver);

const build = series(cleandist, images, icons, styles, scripts, copyhtml, copyjson, browsersync);
exports.default = parallel(build, startwatch);
