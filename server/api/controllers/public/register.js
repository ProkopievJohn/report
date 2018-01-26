import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import config from '../../../../config/server'
import UserCollection from '../../../db/users'

const register = async (ctx, next) => {
  const {email, password} = ctx.request.body

  if (!email || !password) {
    return ctx.invalidData('Email and Password is required')
  }

  const existUser = await UserCollection.findOne({email}, {_id: 1})

  if (existUser) {
    return ctx.invalidData('Email is exist')
  }

  try {
    const user = (await UserCollection.insert({
      createdAt: new Date(),
      modifiedAt: new Date(),
      password: bcrypt.hashSync(password, 10),
      email
    })).ops[0]

    const rawToken = {
      _id: user._id,
      email: user.email
    }
    const token = JWT.sign(
      rawToken,
      config.jwt.user.secret,
      config.jwt.user.opts
    )

    ctx.resolve({
      user: {
        ...user, password: null
      },
      token
    })
  } catch (err) {
    ctx.response.status = 500
    ctx.response.body = {
      payload: err,
      success: false
    }
  }
}

export default register
