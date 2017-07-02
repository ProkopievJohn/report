import Router from 'koa-router';
import JWT from 'jsonwebtoken';
import config from '../../../config/server';
import User from '../../services/user';

export const login = async (ctx, next) => {
	const {email, password} = ctx.request.body;
	if (!email || !password) {
		return next();
	}
	let data = config.defaultData;
	try {
		const user = await User.findOne({email, password});
		const rawToken = {
			_id: user._id,
			email: user.email
		};
		const token = JWT.sign(rawToken, config.jwt.user.secret, config.jwt.user.opt);
		data.user = {
			payload: {
				...user
			},
			token
		};
		ctx.response.body = data;
	} catch (err) {
		ctx.response.status = 403;
		data.errors.push('Your email or password is incorrect!');
		ctx.response.body = data;
	}
	return next();
};

const configureRouter = () => {
	const router = Router();
	router.post('/login', login);

	return [router.routes(), router.allowedMethods()];
};

export default configureRouter;
