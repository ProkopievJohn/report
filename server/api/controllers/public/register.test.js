import request from 'supertest'
import faker from 'faker'
import configureApi from '../../index'
import { createUsersWithAuth } from '../../../db/fixtures/users'
import { ready } from '../../../db/index'

describe('API:Public:Register', () => {
  let api
  let app
  let fixtureData

  beforeAll(async () => {
    await ready()
    api = configureApi()
    app = api.callback()
    fixtureData = await createUsersWithAuth()
  })
  it('should send 400 with empty credentials', async () => {
    await request(app)
      .post('/api/public/register')
      .expect(400)
      .expect({
        payload: { message: 'Email and Password is required' },
        success: false
      })
  })
  it('should send 400 with exists email', async () => {
    const email = fixtureData.email
    const password = faker.internet.password()
    await request(app)
      .post('/api/public/register')
      .send({
        email,
        password
      })
      .expect(400)
      .expect({
        payload: { message: 'Email is exist' },
        success: false
      })
  })
  it('should send 200 with correct email/password', async () => {
    const email = faker.internet.email().toLowerCase()
    const password = faker.internet.password()
    await request(app)
      .post('/api/public/register')
      .send({
        email,
        password
      })
      .expect(200)
      .expect(res => expect(res.body).toMatchObject({
        success: true,
        payload: {
          user: {
            email: {
              address: email,
              verified: false
            }
          }
        }
      }))
  })
})
