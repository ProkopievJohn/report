import Router from 'koa-router'
import list from './list'
import create from './create'
import byId from './byId'
import edit from './edit'
import deleteAbility from './delete'

export default function configureRouter() {
  const router = Router({
    prefix: '/abilities'
  })

  router.get('/', list)
  router.post('/', create)
  router.get('/:abilityId', byId)
  router.post('/:abilityId', edit)
  router.delete('/:abilityId', deleteAbility)

  return [router.routes(), router.allowedMethods()]
}
