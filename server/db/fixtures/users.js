import faker from 'faker'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import config from '../../../config/server'
import UserCollection from '../users'

export async function createUsersWithAuth() {
  const email = faker.internet.email().toLowerCase()
  const password = faker.internet.password()
  const user = {
    password,
    email,
    user: await UserCollection.insert({
      createdAt: new Date(),
      modifiedAt: new Date(),
      password: bcrypt.hashSync(password, 10),
      email: {
        address: email,
        verified: false
      }
    })
  }
  const rawToken = {
    _id: user._id,
    email: user.email
  }
  const authToken = JWT.sign(
    rawToken,
    config.jwt.user.secret,
    config.jwt.user.opts
  )

  return {
    ...user,
    authToken
  }
}
