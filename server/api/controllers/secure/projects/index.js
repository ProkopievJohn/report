import Router from 'koa-router'
import create from './create'
import list from './list'

export default function configureRouter() {
  const router = Router({
    prefix: '/projects'
  })

  router.get('/', list)
  router.post('/', create)

  return [router.routes(), router.allowedMethods()]
}
