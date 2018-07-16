import http from 'http'
import Koa from 'koa'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import paths from '../config/paths'
import serve from 'koa-static'
import configureWebpack from '../scripts/utils/configureWebpack'

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

export async function startup() {
  const api = new Koa()
  await configureWebpack(api)
  api.use(serve(paths.appPublic))
  const server = http.createServer(api.callback())

  server.listen(DEFAULT_PORT, HOST, 511, err => {
    if (err) {
      console.error(`Unable to start server on port ${DEFAULT_PORT}`, err) // eslint-disable-line no-console
    }
  })
}

startup()
