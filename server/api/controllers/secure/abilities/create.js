import { STATUS_ACTIVE, STATUS_DELETED } from '../../../../constants'
import AbilitiesCollection from '../../../../db/abilities'
import { normalizeNameUpper } from '../../../utils/normalize'

async function create(ctx, next) {
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
      return ctx.conflict('Ability already exists')
    }

    const ability = (await AbilitiesCollection.insert({
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
    ctx.notifyAbility({ type: 'create', companyId, ability })
  } catch (err) {
    ctx.fail('Create Ability error', err)
  }
}

export default create
