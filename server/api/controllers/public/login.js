import JWT from 'jsonwebtoken'
import UserCollection from '../../../db/users'
import config from '../../../../config/server'
import normalizeEmailAddress from '../../utils/normalizeEmailAddress'

const login = async (ctx, next) => {
  const {email: bodyEmail, password} = ctx.request.body
  const email = normalizeEmailAddress(bodyEmail)

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
        config.jwt.secret,
        config.jwt.opts
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
