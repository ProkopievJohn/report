import { STATUS_ACTIVE, STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'
import { normalizeNameUpper } from '../../../utils/normalize'

async function create(ctx) {
  const { _id: creatorId, company: { companyId } } = ctx.state.user

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
    }, { fields: { _id: 1 } })

    if (duplicate) {
      return ctx.conflict('Ability Already Exists')
    }

    const ability = (await AbilitiesCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      companyId,
      creatorId,
      name,
      description,
      status: STATUS_ACTIVE,
      history: [{
        action: 'created',
        createdAt: new Date(),
        modifiedValues: {}
      }]
    })).ops[0]

    ctx.resolve({ ability })
    ctx.notifyAbility({
      type: 'create',
      companyId,
      abilityId: ability._id.toString()
    })
  } catch (err) {
    ctx.fail('Create Ability Error', err)
  }
}

export default create
