import Router from 'koa-router';
import JWT from 'koa-jwt';
import config from '../../../config/server';
import configureAuth from './auth';
import { isAuthenticated } from '../utils/isAuthenticated';
import configureUser from './user';

export const userApi = () => {
	const router = Router({
		prefix: '/api/user'
	});
	router.use(...configureAuth());
	router.use(JWT(config.jwt.user));
	router.use(isAuthenticated);
	router.use(...configureUser());

	return router.routes();
};
