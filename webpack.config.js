const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
}

const common = merge([
	{
		entry: paths.src + '/index.js',
		output: {
			path: paths.dist,
			filename: '[name].js',
		},
		module: {
			loaders: [
				// {
				// 	test: /\.js$/,
				// 	loader: 'babel-loader',
				// 	query: {
				// 		presets: ['react', 'env'],
				// 	}
				// },
				{
					test: /\.jade$/,
					loader: 'jade-loader',
					options: {
						pretty: true,
					},
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: paths.src + '/index.jade',
			}),
		],
	}
]);

module.exports = function(env) {
	if (env === 'development') {
		return merge([
            common,
			{
				devServer: {
					stats: 'errors-only',
					port: 3000,
				},
			}
        ]);
	}
	else if (env === 'production') {
		return merge([
            common,
        ]);
	}
};
