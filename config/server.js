const MONGO_HOST = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost'
const MONGO_PORT = process.env.MONGO_PORT ? process.env.MONGO_PORT : '27017'

export default {
  db: {
    name: process.env.NODE_ENV === 'test' ? 'api-test' : 'report',
    uri: `mongodb://${MONGO_HOST}:${MONGO_PORT}`,
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
  socket: {
    systemToken: 'some-very-secret-token-that-must-be-secure-after-all',
    port: parseInt(process.env.SOCKET_PORT) || 3020,
    host: process.env.SOCKET_HOST || 'localhost'
  },
  port: parseInt(process.env.API_PORT, 10) || 3010,
  host: process.env.API_HOST || 'localhost',
  debug: process.env.NODE_ENV !== 'production'
}
