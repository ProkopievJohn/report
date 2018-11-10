import { ObjectID } from 'mongodb'
import { STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'

async function byId(ctx) {
  const { company: { companyId } } = ctx.state.user
  const { abilityId } = ctx.params

  try {
    const request = { _id: ObjectID(abilityId), companyId, status: { $ne: STATUS_DELETED } }
    const ability = await AbilitiesCollection.findOne(request, {
      fields: { name: 1, description: 1, status: 1, createdAt: 1, modifiedAt: 1 }
    })

    if (!ability) {
      return ctx.notFound('Avility Not Found')
    }

    ctx.resolve({ ability })
  } catch (err) {
    ctx.fail('Get Ability Error', err)
  }
}

export default byId
