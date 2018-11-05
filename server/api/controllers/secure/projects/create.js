import { STATUS_ACTIVE } from '../../../../constants'
import ProjectCollection from '../../../../db/projects'
import transformDate from '../../../utils/transformDate'

async function create(ctx, next) {
  const { _id: creatorId, company: { companyId } } = ctx.state.user

  const { name: pName, description: pDescription, since: pSince, to: pTo } = ctx.request.body
  const name = pName.trim()
  const description = pDescription.trim()
  const since = transformDate(pSince)
  const to = transformDate(pTo)

  if (!name || !description || !since || !to) {
    return ctx.invalidData('Empty Fields')
  }

  try {
    const project = (await ProjectCollection.insert({
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

    ctx.resolve({ project })
    ctx.notifyProject({ type: 'create', companyId, project })
  } catch (err) {
    ctx.fail('Create Project error', err)
  }

  ctx.resolve({
    a: 'a'
  })
}

export default create
