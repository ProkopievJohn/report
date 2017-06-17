const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + "/dist/",
		filename: "bundle.js",
		publicPath: '/',
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, "src"),
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env'],
				}
			}
		],
	},
	plugins: debug ? [] : [],
};
