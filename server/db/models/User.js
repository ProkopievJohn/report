import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

import Counter from '../models/Counter';

let UserSchema = new Schema({
	userId: {
		type: String,
		unique: true,
		es_indexed: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
}, {
	strict: true,
	autoIndex: true
});

UserSchema.pre('save', next => {
	if (this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password);
	}

	if (!this.userId) {
		Counter.increment('User', (err, counter) => {
			if (err) {
				next(err);
			}

			this.userId = counter.value.next;

			next();
		});
	} else {
		next();
	}
});

UserSchema.methods.comparePassword = async candidatePassword => {
	await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.passwordMatches = async plainText => {
	if (this.password) {
		await bcrypt.compareSync(plainText, this.password);
	} else {
		return false;
	}
};

export default model('User', UserSchema);
