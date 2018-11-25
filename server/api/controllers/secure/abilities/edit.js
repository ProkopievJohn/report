import { ObjectID } from 'mongodb'
import { STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'
import { normalizeNameUpper } from '../../../utils/normalize'

async function edit(ctx) {
  const { company: { companyId } } = ctx.state.user
  const { abilityId } = ctx.params

  const { name: pName, description: pDescription = '' } = ctx.request.body
  const name = normalizeNameUpper(pName)
  const description = pDescription.trim()

  if (!name) {
    return ctx.invalidData('Empty Fields')
  }

  try {
    const duplicate = await AbilitiesCollection.findOne({
      companyId,
      name,
      status: { $ne: STATUS_DELETED }
    }, { projection: { _id: 1 } })

    if (duplicate) {
      return ctx.conflict('Ability Already Exists')
    }

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
      name,
      description,
      history: [
        ...ability.history,
        {
          createdAt: new Date(),
          action: 'modified',
          modifiedValues: {
            name,
            description
          }
        }
      ]
    }

    await AbilitiesCollection.update(newAbility)

    ctx.resolve({ ability: newAbility })
    ctx.notifyAbility({
      type: 'update',
      companyId,
      abilityId
    })
  } catch (err) {
    ctx.fail('Edit Ability error', err)
  }
}

export default edit
