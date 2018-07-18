import Router from 'koa-router'
import tokenUpdate from './tokenUpdate'

export default function configureRouter() {
  const router = Router({
    prefix: '/users'
  })
  router.get('/token-renew', tokenUpdate)

  return [router.routes(), router.allowedMethods()]
}
