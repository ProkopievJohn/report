import Router from 'koa-router'

export default () => {
  const router = Router({
    prefix: '/api/public'
  })

  return router.routes()
}
