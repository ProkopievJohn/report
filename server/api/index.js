import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import config from '../../config/server'
import cors from '../utils/cors'
import { configurePublicApi, configureSecureApi } from './controllers'
import responseHelpers from './utils/responseHelpers'

export default () => {
  const api = new Koa()

  api.use(BodyParser())

  config.debug && api.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const execution = new Date() - start
    execution > 100 && console.warn(`[INFO] ${ctx.url} ${ctx.method} Execution ${execution}ms`) // eslint-disable-line no-console
  })

  api.use(responseHelpers)

  api.proxy = true

  api.use((ctx, next) => (
    Promise.race([
      next(),
      new Promise((resolve, reject) => setTimeout(reject.bind('timeout'), 3000))
    ]).catch(err => {
      if (err === 'timeout') {
        console.log(`
          [TIEMOUT] Request execution time is too long
          Request to ${ctx.url}
          From ${ctx.ip}
          Method ${ctx.method}
          Query params ${ctx.querystring}
          `)
      } else {
        throw err
      }
    })
  ))

  config.debug && api.use(cors())

  api.use(async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      if (!ctx.response.body) {
        console.error(e)
        ctx.response.status = 500
        if (config.debug) {
          ctx.response.body = e
        } else {
          ctx.response.body = {
            message: 'An error has occurred during the execution of your request'
          }
        }
      }
    }
  })

  api.use(configurePublicApi())
  api.use(configureSecureApi())

  return api
}
