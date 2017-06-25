import http from 'http';
import Koa from 'koa';
import BodyParser from 'koa-body-parser';
import cors from 'koa-cors';
import config from '../config/server';
import {
	publicApi,
	userApi,
	adminApi
} from './api';

export default () => {
	const app = new Koa();

	app
		.use(cors())
		.use(BodyParser());

	config.debug && app.use(async (ctx, next) => {
		const start = new Date();
		await next();
		const execution = new Date() - start;
		if (execution > 400) {
			console.warn(`[INFO]Long execution ${execution}ms ${ctx.url} ${ctx.method}`); // eslint-disable-line no-console;
		}
	});

	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			if (!ctx.response.body) {
				console.error(e);
				ctx.response.status = 500;
				if (config.debug) {
					ctx.response.body = e;
				} else {
					let data = config.defaultData;
					ctx.response.body = data.errors.push('Something went wrong with execution of your request');
				}
			}
		}
	});

	app.use(publicApi());
	app.use(userApi());
	app.use(adminApi());

	http.createServer(app.callback()).listen(config.port, config.host, err => {
		if (err) {
			console.error(`Error to start server on port ${config.port} on host ${config.host}`, err); // eslint-disable-line no-console;
		}
	});
};
