import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import config from '../../../../config/server'
import UserCollection from '../../../db/users'

const register = async (ctx, next) => {
  const {email, password} = ctx.request.body

  if (!email || !password) {
    ctx.response.status = 400
    ctx.response.body = {
      payload: { message: 'Email and Password is required' },
      success: false
    }
  }

  const user = (await UserCollection.insert({
    createdAt: new Date(),
    modifiedAt: new Date(),
    password: bcrypt.hashSync(password, 10),
    email
  })).ops[0]

  const rawToken = {
    _id: user._id,
    emails: user.emails
  }

  const token = JWT.sign(
    rawToken,
    config.jwt.user.secret,
    config.jwt.user.opts
  )

  ctx.response.status = 200
  ctx.response.body = {
    payload: {
      user: { ...user, password: null },
      token
    },
    success: true
  }
}

export default register
