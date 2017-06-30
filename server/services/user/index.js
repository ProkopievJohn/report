import User from '../../db/models/User';
import config from '../../../config/server';

export const findById = async id => {
	let data = config.defaultData;

	try {
		let user = await User.find({_id: id}).lean().exec();
		data.user = user;
	} catch (err) {
		console.log('error in user service: ', err);
		data.errors.push('Can not find user');
	}

	return data;
};
