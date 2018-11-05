import JWT from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import UserCollection from '../../../db/users'
import CompanyCollection from '../../../db/companies'
import config from '../../../../config/server'
import { normalizeEmailAddress } from '../../utils/normalizeEmailAddress'
import { STATUS_ACTIVE } from '../../../constants'

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
    } else {
      ctx.invalidData('Email or Password is wrong')
    }
  } catch (err) {
    ctx.fail('Login error', err)
  }
}

export default login
