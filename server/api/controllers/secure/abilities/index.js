import Router from 'koa-router'
import list from './list'
import create from './create'

export default function configureRouter() {
  const router = Router({
    prefix: '/abilities'
  })

  router.get('/', list)
  router.post('/', create)

  return [router.routes(), router.allowedMethods()]
}
