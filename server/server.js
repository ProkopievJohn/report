import http from 'http';
import Koa from 'koa';
import BodyParser from 'koa-body-parser';
// import cors from 'koa-cors';
import serve from 'koa-static';
import path from 'path';
import config from '../config/server';
import {
	// userApi,
	// adminApi
} from './api';
import { connect } from './db';

export default async () => {
	await connect();

	const app = new Koa();

	// app.use(cors());
	app.use(BodyParser());

	config.debug && app.use(async (ctx, next) => {
		const start = new Date();
		await next();
		const execution = new Date() - start;
		if (execution > 400) {
			console.warn(`[INFO] Long execution ${execution}ms. URL: ${ctx.url}; METHOD: ${ctx.method}`); // eslint-disable-line no-console;
		}
	});

	app.use((ctx, next) => {
		console.log(`[INFO] To URL: ${ctx.url}; With method: ${ctx.method}; From IP: ${ctx.ip};`);
		return next();
	});

	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			if (!ctx.response.body) {
				console.error(e); // eslint-disable-line no-console;
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

	// app.use(userApi());
	// app.use(adminApi());

	app.use(serve(path.resolve('build')));

	http.createServer(app.callback()).listen(config.port, config.host, err => {
		if (err) {
			console.error(`Error to start server on  http://${config.host}:${config.port}`, err); // eslint-disable-line no-console;
		}
		console.error(`[INFO] Start server on http://${config.host}:${config.port}`); // eslint-disable-line no-console;
	});
};
