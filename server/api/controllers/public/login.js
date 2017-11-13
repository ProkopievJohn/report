import UserCollection from '../../../db/users'
import JWT from 'jsonwebtoken'
import config from '../../../../config/server'

const login = async (ctx, next) => {
  const {email, password} = ctx.request.body
  if (!email || !password) {
    ctx.response.status = 400
    ctx.response.body = {
      payload: { message: 'Email and Password is required' },
      success: false
    }
  } else {
    try {
      const user = await UserCollection.authenticate({
        email,
        password
      })

      if (user) {
        const rawToken = {
          _id: user._id,
          companies: user.companies,
          emails: user.emails,
          groups: (user.groups || [])
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
      } else {
        ctx.response.status = 400
        ctx.response.body = {
          payload: { message: 'Email or Password is wrong' },
          success: false
        }
      }
    } catch (err) {
      ctx.response.status = 500
      ctx.response.body = {
        payload: err,
        success: false
      }
    }
  }
}

export default login
