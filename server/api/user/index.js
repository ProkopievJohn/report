import Router from 'koa-router';
import JWT from 'koa-jwt';
import config from '../../../config/server';
import { isAuthenticated } from './utils/isAuthenticated';
import configureCompany from './company/index';
import configureChannel from './chat/channel';
import configureMessage from './chat/message';

export function configureUserApi () {
	const router = Router({
		prefix: '/api/secure'
	});
	router.use(JWT(config.jwt.user));
	router.use(isAuthenticated);
	router.use(...configureMessage());
	router.use(...configureChannel());
	router.use(...configureCompany());

	return router.routes();
};
