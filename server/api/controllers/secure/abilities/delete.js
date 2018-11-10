import { ObjectID } from 'mongodb'
import { STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'

export default async function deleteAbility(ctx) {
  const { company: { companyId } } = ctx.state.user
  const { abilityId } = ctx.params

  try {
    const ability = await AbilitiesCollection.findOne({
      _id: ObjectID(abilityId),
      companyId,
      status: { $ne: STATUS_DELETED }
    })

    if (!ability) {
      return ctx.notFound('Avility Not Found')
    }

    const newAbility = {
      ...ability,
      status: STATUS_DELETED,
      history: [
        ...ability.history,
        {
          createdAt: new Date(),
          action: 'deleted',
          modifiedValues: {}
        }
      ]
    }

    await AbilitiesCollection.update(newAbility)

    ctx.resolve({ ability: newAbility })
    ctx.notifyAbility({
      type: 'delete',
      companyId,
      abilityId
    })
  } catch (err) {
    ctx.fail('Delete Ability Error', err)
  }
}
