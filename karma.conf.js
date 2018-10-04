var webpack = require("webpack");
var	path = require("path");

var date = new Date();
var today = "_" + date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear();


module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],
		files: [
			"./specs/*.spec.js",
		],
		preprocessors: {
			"./specs/*.spec.js": ["webpack"]
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /.js?$/,
						loader: "babel-loader",
						exclude: /node_modules/,
						query: {
							presets: ["es2015", "react", "airbnb"]
						}
					},
					{
						test: /\.scss$/,
						loaders: ["style", "css", "sass"]
					},
					{
						test: /\.(png|woff|woff2|eot|ttf|svg)$/,
						loader: "url-loader?limit=100000"
					},
					{
						test: /\.json$/,
						loader: "json"
					},
				]
			},
			externals: {
				"jsdom": "window",
				"cheerio": "window",
				"react/addons": true,
				"react/lib/ExecutionEnvironment": true,
				"react/lib/ReactContext": true
			},
			resolve: {
				modulesDirectories: [
					"node_modules",
					"src"
				],
			},
			node: {
				fs: "empty" // this fixes 'can not resolve module fs'
			}
		},
		webpackMiddleware: {
			noInfo: true
		},
		plugins: [
			"karma-webpack",
			"karma-jasmine",
			"karma-phantomjs-launcher",
			"karma-verbose-reporter",
			"karma-htmlfile-reporter",
			"karma-chrome-launcher"
		],
		// reporters: ["verbose"],
		reporters: ["verbose","progress", "html"],
		htmlReporter: {
			outputFile: "test_report/report" + today + ".html",
			// Optional
			pageTitle: "Maybank Unit Tests",
			groupSuites: true,
			useCompactStyle: false,
			useLegacyStyle: true
		},
		port: 9111,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ["PhantomJS"],
		// browsers: ["Chrome"],
		singleRun: false
	});
};
