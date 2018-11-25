import { STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'

async function list(ctx) {
  const { company: { companyId } } = ctx.state.user

  try {
    const request = { companyId, status: { $ne: STATUS_DELETED } }
    const abilities = await AbilitiesCollection.find(request, {
      projection: { name: 1, description: 1, status: 1, createdAt: 1, modifiedAt: 1 }
    })
    ctx.resolve({
      abilities
    })
  } catch (err) {
    ctx.fail('Get Abilities error', err)
  }
}

export default list
