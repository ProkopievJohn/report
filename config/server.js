export default {
  db: {
    uri: process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/api-test'
      : 'mongodb://localhost:27017/report',
    options: {}
  },
  jwt: {
    secret: 'very-secret-token-for-application',
    public: 'very-secret-token-for-application',
    passthrough: true,
    opts: {
      // algorithm: 'RS256'
    }
  },
  protocol: process.env.HTTPS === 'true' ? 'https' : 'http',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  debug: process.env.NODE_ENV !== 'production'
}
