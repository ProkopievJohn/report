import Router from 'koa-router'
import list from './list'
import create from './create'
import byId from './byId'
// import edit from './edit'
// import deleteActivity from './delete'

export default function configureRouter() {
  const router = Router({
    prefix: '/activities'
  })

  router.get('/', list)
  router.post('/', create)
  router.get('/:activityId', byId)
  // router.post('/:activityId', edit)
  // router.delete('/:activityId', deleteAbility)

  return [router.routes(), router.allowedMethods()]
}
