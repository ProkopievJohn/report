import mongoose from 'mongoose';
import config from '../../config/server';

if (!mongoose.Promise) mongoose.Promise = global.Promise;

let db;

export const connect = () => {
	if (!db) {
		mongoose.connect(config.db.uri, { useMongoClient: true });
		db = mongoose.connection;
		db.on('error', (err) => {
			console.error(`[ERROR] Connection to db error: ${err}`); // eslint-disable-line no-console;
		});
		db.once('open', () => {
			console.log(`[INFO] Connected to db: ${config.db.uri}`); // eslint-disable-line no-console;
		});
	};
	return mongoose;
};

export const disconnect = () => {
	db.close();
};

const getDb = async () => {
	if (!db) {
		console.error('[ERROR] not connection to db!!!'); // eslint-disable-line no-console;
	}
	return db;
};

export default getDb;
