import JWT from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import UserCollection from '../../../../db/users'
import CompanyCollection from '../../../../db/companies'
import config from '../../../../../config/server'
import { STATUS_ACTIVE } from '../../../../constants'

export default async function tokenUpdate(ctx, next) {
  const { _id } = ctx.state.user
  if (!_id) {
    return ctx.accessDenied()
  }

  try {
    const user = await UserCollection.findOne({_id: ObjectID(_id)})

    if (!user) {
      return ctx.notFound()
    }

    const company = await CompanyCollection.findOne({
      _id: ObjectID(user.company.companyId),
      status: STATUS_ACTIVE
    }, { fields: { name: 1 } })

    const rawToken = {
      _id: user._id,
      email: user.email,
      company: user.company
    }
    const token = JWT.sign(
      rawToken,
      config.jwt.secret,
      config.jwt.opts
    )

    ctx.resolve({
      user: {
        ...user,
        company: {
          ...user.company,
          name: company.name
        },
        password: null
      },
      token
    })
  } catch (err) {
    ctx.fail('Token update error', err)
  }
}
