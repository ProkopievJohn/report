import http from 'http'
import Koa from 'koa'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import webpackConfig from '../config/webpack.config.dev'
import paths from '../config/paths'
import serve from 'koa-static'
import { setupMiddleware } from '../scripts/utils/setupMiddleware'

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http'

export async function startup() {
  const api = new Koa()
  await setupMiddleware(api, webpackConfig, PROTOCOL, HOST, DEFAULT_PORT)
  api.use(serve(paths.appPublic))
  const server = http.createServer(api.callback())

  server.listen(DEFAULT_PORT, HOST, 511, err => {
    if (err) {
      console.error(`Unable to start server on port ${DEFAULT_PORT}`, err) // eslint-disable-line no-console
    }
  })
}

startup()
