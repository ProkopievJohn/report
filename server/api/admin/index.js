import Router from 'koa-router';
import JWT from 'koa-jwt';
import config from '../../../config/server';
import { isAuthenticated } from '../utils/isAuthenticated';

export const adminApi = () => {
	const router = Router({
		prefix: '/api/admin'
	});
	router.use(JWT(config.jwt.admin));
	router.use(isAuthenticated);

	return router.routes();
};
