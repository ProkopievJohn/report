import { STATUS_ACTIVE, ROLE_ADMIN, ROLE_USER } from '../../../../constants'
import UserCollection from '../../../../db/users'
import { normalizeEmailAddress } from '../../../utils/normalize'

async function create(ctx) {
  const { company: { companyId } } = ctx.state.user
  const { name: pName, email: pEmail, abilities = [], role, rate: pRate } = ctx.request.body

  const name = pName.trim()
  const email = normalizeEmailAddress(pEmail)
  const rate = Number(pRate)

  if (!name || !email || !abilities.length || role === undefined || !rate) {
    return ctx.invalidData('Empty Fields')
  }

  if (role !== ROLE_ADMIN && role !== ROLE_USER) {
    return ctx.invalidData('Cannot create user with this role')
  }

  try {
    const existUser = await UserCollection.findOne({'email.address': email}, {_id: 1})

    if (existUser) {
      return ctx.invalidData('Email is exist')
    }

    const user = (await UserCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      password: '',
      status: STATUS_ACTIVE,
      name,
      rate,
      abilities,
      email: {
        address: email,
        verified: false
      },
      company: {
        companyId,
        role
      },
      lastSeen: new Date(),
      history: [{
        action: 'created',
        createdAt: new Date(),
        modifiedValues: {}
      }]
    })).ops[0]

    ctx.resolve({ user })
    ctx.notifyUser({
      type: 'create',
      companyId,
      userId: user._id.toString()
    })
  } catch (err) {
    ctx.fail('User error', err)
  }
}

export default create
