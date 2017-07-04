import config from '../../../config/server';

const isAuthenticated = (ctx, next) => {
	if (ctx.state && ctx.state.user && typeof ctx.state.user._id === 'string') {
		return next();
	} else {
		let data = config.defaultData;

		data.errors.push('Please login');

		ctx.response.status = 401;
		ctx.redirect('/login');
		ctx.response.body = data;
	}
};

export default isAuthenticated;
