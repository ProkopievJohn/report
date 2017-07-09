import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const paths = {
	src: path.join(process.cwd(), 'client'),
	dist: path.resolve(process.cwd(), 'dist')
};

export default {
	devtool: 'eval',
	entry: paths.src + '\\index.js',
	output: {
		path: paths.dist,
		pathinfo: true,
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.scss']
	},
	module: {
		rules: [
			{
				exclude: [
					/\.html$/,
					/\.js(\?.*)?$/,
					/\.css$/,
					/\.json$/,
					/\.(png|jpg|gif|svg)$/
				],
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: 'media/[name].[ext]'
				}
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				include: paths.src,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				include: paths.src,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: [
						[
							'env',
							{
								modules: false,
								targets: {
									browsers: ['last 2 versions']
								}
							}
						],
						'react',
						'stage-1'
					]
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plagins: [
									autoprefixer({
										browsers: ['last 2 versions']
									})
								]
							}
						},
						'sass-loader'
					]
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: 'media/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: paths.src + '/index.jade',
			inject: 'body'
		})
	]
};
