import Router from 'koa-router'
import register from './register'

export function configurePublicApi() {
  const router = Router({
    prefix: '/api/public'
  })

  router.post('/register', register)

  return router.routes()
}
