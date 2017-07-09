import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '../../config/server';
import webpackConfig from '../../config/webpack.config.dev';

const compiler = webpack(webpackConfig);

compiler.plugin('invalid', () => {
	console.log('Compiling invalid...'); // eslint-disable-line no-console;
});

const webpackDevMiddlewareInstance = webpackMiddleware(compiler, {
	watchOptions: {
		ignored: /node_modules/
	},
	host: config.host,
	hot: true
});

export default webpackDevMiddlewareInstance;
