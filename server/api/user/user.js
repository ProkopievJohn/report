import Router from 'koa-router';
import User from '../../db/models/User';
import config from '../../../config/server';
// import { isAuthenticated } from '../utils/isAuthenticated'

export const getUser = async (ctx, next) => {
	const { userId } = ctx.params;

	if (!userId) {
		return next();
	}
	let data = config.defaultData;

	try {
		const user = await User.findOne({userId});

		ctx.response.status = 200;
		data.user = {
			payload: {
				...user
			}
		};
		ctx.response.body = data;
	} catch (err) {
		ctx.response.status = 404;
		data.messages.push('User is not found!');
		ctx.response.body = data;
	}
	return next();
};

const configureRouter = () => {
	const router = Router();

	router.get('/:userId', getUser);
	// router.get('/:userId', isAuthenticated, getUser);

	return [router.routes(), router.allowedMethods()];
};
export default configureRouter;
