import Router from 'koa-router'
import KoaJWT from 'koa-jwt'
import register from './register'
import login from './login'
import logout from './logout'
import config from '../../../../config/server'

export function configurePublicApi() {
  const router = Router({
    prefix: '/api/public'
  })

  router.post('/register', register)
  router.post('/login', login)
  router.post('/logout', KoaJWT({...config.jwt}), logout)

  return router.routes()
}
