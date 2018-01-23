import request from 'supertest'
import configureApi from '../../index'
import { createUsersWithAuth } from '../../../db/fixtures/users'
import { ready } from '../../../db/index'

describe('API:Public:Login', () => {
  let api
  let app
  let fixtureData

  beforeEach(async () => {
    await ready()
    api = configureApi()
    app = api.callback()
    fixtureData = await createUsersWithAuth()
    console.log('fixtureData: ', fixtureData)
  })

  it('should send 400 with empty credentials', async () => {
    await request(app)
      .post('/api/public/login')
      .expect(400)
      .expect({
        payload: { message: 'Email and Password is required' },
        success: false
      })
  })

  // it('should send 200 with correct email/password', async () => {
  //   const email = fixtureData.user.email
  //   const password = fixtureData.user.password
  //   await request(app)
  //     .post('/api/2/public/login')
  //     .send({
  //       email,
  //       password
  //     })
  //     .expect(200)
  //     .expect(res => {
  //       if (!res.body.success || !res.body.payload.user || !res.body.payload.token) {
  //         throw new Error('Wrong response')
  //       }
  //     })
  // })

  // it('should send 200 with correct phoneNumber/password', async () => {
  //   const email = fixtureData.user.phoneNumber
  //   const password = fixtureData.user.password
  //   await request(app)
  //     .post('/api/2/public/login')
  //     .send({
  //       email,
  //       password
  //     })
  //     .expect(200)
  //     .expect(res => {
  //       if (!res.body.success || !res.body.payload.user || !res.body.payload.token) {
  //         throw new Error('Wrong response')
  //       }
  //     })
  // })

  // it('should send 403 with unverified email', async () => {
  //   const fixtureData = await createUnverifiedUserWithCompany()
  //   const { user, company } = fixtureData
  //   const { email, password } = user
  //   const { name } = company

  //   api.context.sendEmail = (mailType, options) => {
  //     const { companyName, email: userEmail } = options

  //     expect(mailType).toEqual('verifyEmail')
  //     expect(companyName).toEqual(name)
  //     expect(userEmail).toEqual(email)
  //   }

  //   await request(app)
  //     .post('/api/2/public/login')
  //     .send({
  //       email,
  //       password
  //     })
  //     .expect(403)
  //     .expect(res => {
  //       if (res.body.success || res.body.payload.user || res.body.payload.token) {
  //         throw new Error('Wrong response')
  //       }
  //     })
  // })

  // it('should send 200 with unverified email but correct phoneNumber', async () => {
  //   const fixtureData = await createUnverifiedUserWithCompany()
  //   const email = fixtureData.user.phoneNumber
  //   const password = fixtureData.user.password
  //   await request(app)
  //     .post('/api/2/public/login')
  //     .send({
  //       email,
  //       password
  //     })
  //     .expect(200)
  //     .expect(res => {
  //       if (!res.body.success || !res.body.payload.user || !res.body.payload.token) {
  //         throw new Error('Wrong response')
  //       }
  //     })
  // })
})
