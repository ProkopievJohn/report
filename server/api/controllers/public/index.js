import Router from 'koa-router'
import register from './register'
import login from './login'

export function configurePublicApi() {
  const router = Router({
    prefix: '/api/public'
  })

  router.post('/register', register)
  router.post('/login', login)

  return router.routes()
}
