import JWT from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import UserCollection from '../../../../db/users'
import config from '../../../../../config/server'

export default async function tokenUpdate(ctx, next) {
  const { _id } = ctx.state.user
  if (!_id) {
    return ctx.accessDenied()
  }

  const user = await UserCollection.findOne({_id: new ObjectId(_id)})

  if (!user) {
    return ctx.notFound()
  }

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
}
