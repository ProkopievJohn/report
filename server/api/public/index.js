import Router from 'koa-router';
import configureAuthUser from '../user/auth';

export const publicApi = () => {
	const router = Router({
		prefix: '/api/public'
	});
	router.use(...configureAuthUser());
	return router.routes();
};
