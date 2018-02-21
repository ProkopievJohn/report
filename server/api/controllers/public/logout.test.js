import request from 'supertest'
import configureApi from '../../index'
import { createUsersWithAuth } from '../../../db/fixtures/users'
import { ready } from '../../../db/index'

describe('API:Public:Login', () => {
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

  it('should send 404 without loged user', async () => {
    await request(app)
      .post('/api/public/logout')
      .expect(404)
      .expect({
        payload: { message: 'Not Found' },
        success: false
      })
  })
  it('should send 200 with correct email/password', async () => {
    await request(app)
      .post('/api/public/logout')
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
