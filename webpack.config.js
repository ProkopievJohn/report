const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const isProd = process.env.NODE_ENV === 'production';

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
};

const common = merge([
	{
		entry: paths.src + '/index.js',
		output: {
			path: paths.dist,
			filename: '[name].js'
		},
		module: {
			loaders: [
				{
					enforce: 'pre',
					test: /\.js$/,
					use: 'eslint-loader',
					exclude: /node_modules/
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						presets: ['react', 'env']
					}
				},
				{
					test: /\.jade$/,
					loader: 'jade-loader',
					options: {
						pretty: true
					}
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: paths.src + '/index.jade'
			})
		]
	}
]);

module.exports = function () {
	return isProd
		? merge([
			common
		])
		: merge([
			common,
			{
				devServer: {
					stats: 'errors-only',
					port: 3000
				}
			}
		]);
};
