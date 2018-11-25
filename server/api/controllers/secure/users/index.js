import Router from 'koa-router'
import create from './create'
import list from './list'
import tokenUpdate from './tokenUpdate'

export default function configureRouter() {
  const router = Router({
    prefix: '/users'
  })

  router.get('/', list)
  router.post('/', create)
  router.get('/token-renew', tokenUpdate)

  return [router.routes(), router.allowedMethods()]
}
