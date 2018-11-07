import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

import { normalizeEmailAddress } from '../../utils/normalize'
import { STATUS_ACTIVE, ROLE_OWNER } from '../../../constants'
import CompanyCollection from '../../../db/companies'
import UserCollection from '../../../db/users'
import config from '../../../../config/server'

const register = async (ctx, next) => {
  const { name, email: bodyEmail, password } = ctx.request.body

  const email = normalizeEmailAddress(bodyEmail)
  const companyName = name.trim()

  if (!companyName || !email || !password) {
    return ctx.invalidData('Email and Password is required')
  }

  try {
    const existUser = await UserCollection.findOne({'email.address': email}, {_id: 1})

    if (existUser) {
      return ctx.invalidData('Email is exist')
    }

    const company = (await CompanyCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: companyName,
      status: STATUS_ACTIVE,
      history: [{
        action: 'created',
        createdAt: new Date(),
        modifiedValues: {}
      }]
    })).ops[0]

    const user = (await UserCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      password: bcrypt.hashSync(password, 10),
      email: {
        address: email,
        verified: false
      },
      company: {
        companyId: company._id.toString(),
        role: ROLE_OWNER
      },
      lastSeen: new Date(),
      history: [{
        action: 'created',
        createdAt: new Date(),
        modifiedValues: {}
      }]
    })).ops[0]

    const rawToken = {
      _id: user._id,
      email: user.email.address,
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
        password: null,
        company: {
          ...user.company,
          name: company.name
        }
      },
      token
    })
  } catch (err) {
    ctx.fail('Register error', err)
  }
}

export default register
