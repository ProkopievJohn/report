import Router from 'koa-router';
import JWT from 'koa-jwt';
import config from '../../../config/server';
// import { isAuthenticated } from './utils/isAuthenticated';
// import configureAuth from './admin/auth';
// import configureCompany from './admin/company';
// import configureUser from './admin/user';

export const adminApi = () => {
	const router = Router({
		prefix: '/api/admin'
	});
	// router.use(...configureAuth());
	router.use(JWT(config.jwt.admin));
	// router.use(isAuthenticated);
	// router.use(...configureCompany());
	// router.use(...configureUser());

	return router.routes();
};
