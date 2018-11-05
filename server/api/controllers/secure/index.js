import KoaJWT from 'koa-jwt'
import Router from 'koa-router'
import { isAuthenticated } from '../../utils/isAuthenticated'
import config from '../../../../config/server'
import configureUsers from './users'
import configureProjects from './projects'

export function configureSecureApi() {
  const router = Router({
    prefix: '/api/secure'
  })
  router.use(KoaJWT(config.jwt))
  router.use(isAuthenticated)
  router.use(...configureUsers())
  router.use(...configureProjects())

  return router.routes()
}
