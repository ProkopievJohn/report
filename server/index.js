require('babel-register');

const cluster = require('cluster');
const server = require('./server');

if (cluster.isMaster) {
	const cpus = process.env.NODE_WORKER_COUNT || require('os').cpus().length * 2 || 2;
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log('[WARN] Worker %d code/signal %s. Restarting worker...', worker.process.pid, signal, code);// eslint-disable-line no-console
		cluster.fork();
	});
} else {
	server.default();
}
