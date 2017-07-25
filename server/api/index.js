import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import config from '../../config/server'
import cors from '../utils/cors'

export default () => {
  const api = new Koa()

  api.use(BodyParser())

  config.debug && api.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const execution = new Date() - start
    console.warn(`[INFO] ${ctx.url} ${ctx.method} Execution ${execution}ms`) // eslint-disable-line no-console
  })
  api.proxy = true

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

  return api
}
