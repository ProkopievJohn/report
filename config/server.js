const MONGO_HOST = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost'
const MONGO_PORT = process.env.MONGO_PORT ? process.env.MONGO_PORT : '27017'

export default {
  db: {
    uri: process.env.NODE_ENV === 'test'
      ? `mongodb://${MONGO_HOST}:${MONGO_PORT}/api-test`
      : `mongodb://${MONGO_HOST}:${MONGO_PORT}/report`,
    options: {
      useNewUrlParser: true
    }
  },
  jwt: {
    secret: 'very-secret-token-for-application',
    public: 'very-secret-token-for-application',
    passthrough: true,
    opts: {
      // algorithm: 'RS256'
    }
  },
  port: parseInt(process.env.API_PORT, 10) || 3010,
  host: process.env.API_HOST || 'localhost',
  debug: process.env.NODE_ENV !== 'production'
}
