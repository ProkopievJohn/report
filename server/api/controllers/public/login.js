import UserCollection from '../../../db/users'
import JWT from 'jsonwebtoken'
import config from '../../../../config/server'

const login = async (ctx, next) => {
  const {email, password} = ctx.request.body

  if (!email || !password) {
    return ctx.invalidData('Email and Password is required')
  }

  try {
    const user = await UserCollection.authenticate({
      email,
      password
    })

    if (user) {
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
    } else {
      ctx.invalidData('Email or Password is wrong')
    }
  } catch (err) {
    ctx.fail('Login error', err)
  }
}

export default login
