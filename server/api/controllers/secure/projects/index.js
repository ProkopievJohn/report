import Router from 'koa-router'
import create from './create'

export default function configureRouter() {
  const router = Router({
    prefix: '/projects'
  })

  router.post('/', create)

  return [router.routes(), router.allowedMethods()]
}
