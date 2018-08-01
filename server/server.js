import { createServer } from 'http'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import { worker } from 'cluster'
import configureSocket from './socket/configureSocket'
import configureApi from './api'
import config from '../config/server'
import paths from '../config/paths'
import connectDb from './db'

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

function padRight(text, neededLength) {
  if (text.length === neededLength) {
    return text
  } else {
    return text + (new Array(neededLength - text.length + 1).join(' '))
  }
}

console.log( // eslint-disable-line no-console
  `
+-------------------------------------------------------------+
|                      Report API Server                      |
+-------------------------------------------------------------+
| Worker #${padRight(worker.id + ' is started', 51)} |
| Port:            ${padRight(config.port + '', 42)} |
+-------------------------------------------------------------+
`)

export default async () => {
  await connectDb()

  const api = configureApi()
  const server = createServer(api.callback())
  configureSocket(api, worker.id)

  server.listen(config.port, config.host, err => {
    if (err) {
      console.error(`[ERROR] Unable to start server on port ${config.port}`, err) // eslint-disable-line no-console
    }
    console.log(`[INFO] server start on http://${config.host}:${config.port}`) // eslint-disable-line no-console
  })
}
