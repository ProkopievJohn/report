export default {
	db: {
		uri: 'mongodb://localhost:27017/freiraum',
		options: {}
	},
	jwt: {
		user: {
			secret: 'very-secret-token',
			public: 'very-secret-token',
			opt: {
				// algorithm: 'RS256'
			}
		},
		admin: {
			secret: 'very-secret-admin-token',
			public: 'very-secret-admin-token',
			opt: {
				// algorithm: 'RS256'
			}
		}
	},
	debug: process.env.NODE_ENV !== 'production',
	port: parseInt(process.env.PORT, 10) || 3000,
	host: process.env.HOST || 'localhost',
	defaultData: {
		errors: [],
		messages: [],
		info: []
    }
};
