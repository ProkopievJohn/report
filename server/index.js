process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
const cluster = require('cluster')

require('../config/env')

if (cluster.isMaster) {
  const cpus = require('os').cpus().length * 2
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('[WARN] Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal, code) // eslint-disable-line no-console
    cluster.fork()
  })
} else {
  require('./server').default()
}
