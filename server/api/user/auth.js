import Router from 'koa-router';
import JWT from 'jsonwebtoken';
import config from '../../../config/server';
import UserCollection from '../../services';

export const login = async (ctx, next) => {
	const {email, password} = ctx.request.body;
	if (!email || !password) {
		return next();
	}
	try {
		const user = await UserCollection.authenticate({email, password});
		const rawToken = {
			_id: user._id,
			email: user.email
		};
		const token = JWT.sign(rawToken, config.jwt.user.secret, config.jwt.user.opt);
		let data = config.defaultData;
		data.user = {
			payload: {
				...user,
				password: null
			},
			token
		};
		ctx.response.body = data;
	} catch (err) {
		return next();
	}
};

function wrong (ctx) {
	if (ctx.response.body) {
		return;
	}
	ctx.response.status = 403;
	let data = config.defaultData;
	data.errors.push('Your email or password is incorrect!');
	ctx.response.body = data;
};

const configureRouter = () => {
	const router = Router();
	router.post(
		'/login',
		login,
		wrong
	);
	return [router.routes(), router.allowedMethods()];
};

export default configureRouter;
