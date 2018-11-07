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
    user: (await UserCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      password: bcrypt.hashSync(password, 10),
      email: {
        address: email,
        verified: false
      }
    })).ops[0]
  }
  const rawToken = {
    _id: user.user._id,
    email: user.user.email
  }

  const authToken = JWT.sign(
    rawToken,
    config.jwt.secret,
    config.jwt.opts
  )

  return {
    ...user,
    authToken
  }
}
