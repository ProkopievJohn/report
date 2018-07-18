import request from 'supertest'
import configureApi from '../../../index'
import { createUsersWithAuth } from '../../../../db/fixtures/users'
import { ready } from '../../../../db/index'

describe('API:Secure:Users:TokenUpdate', () => {
  let api
  let app
  const headers = {}
  let fixtureData

  beforeAll(async () => {
    await ready()
    api = configureApi()
    app = api.callback()
  })

  beforeEach(async () => {
    fixtureData = await createUsersWithAuth()
    headers.Authorization = `Bearer ${fixtureData.authToken}`
  })

  it('should send 401 without headers', async () => {
    await request(app)
      .get('/api/secure/users/token-renew')
      .expect(401)
      .expect({
        payload: { message: 'Unauthorized' },
        success: false
      })
  })
  it('should send 200 with correct token', async () => {
    await request(app)
      .post('/api/secure/users/token-renew')
      .set(headers)
      .expect(200)
      .expect(res => expect(res.body).toMatchObject({
        success: true,
        payload: {
          email: fixtureData.user.email
        }
      }))
  })
})
