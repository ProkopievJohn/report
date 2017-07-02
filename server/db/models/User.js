import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

import Counter from '../models/Counter';

export const ROLE_ADMIN = 1;
export const ROLE_USER = 2;

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
		required: true,
		select: false
	},
	email: {
		address: {
			type: String,
			required: true,
			unique: true
		},
		verified: {
			type: Boolean,
			default: false
		}
	},
	role: {
		type: Number,
		required: true
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

export default mongoose.model('User', UserSchema);
