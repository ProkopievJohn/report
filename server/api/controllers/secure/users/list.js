import { ObjectID } from 'mongodb'
import { STATUS_DELETED } from '../../../../constants'
import UsersCollection from '../../../../db/users'

async function list(ctx) {
  const { _id: userId, company: { companyId } } = ctx.state.user

  try {
    const request = { _id: { $ne: ObjectID(userId) }, 'company.companyId': companyId, status: { $ne: STATUS_DELETED } }
    const users = await UsersCollection.find(request, { projection: { password: 0 } })
    ctx.resolve({ users })
  } catch (err) {
    ctx.fail('Get Users error', err)
  }
}

export default list
