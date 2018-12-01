import { STATUS_DELETED } from '../../../../constants'
import ProjectsCollection from '../../../../db/projects'

async function list(ctx) {
  const { company: { companyId } } = ctx.state.user

  try {
    const request = { companyId, status: { $ne: STATUS_DELETED } }
    const projects = await ProjectsCollection.find(request, {
      projection: {
        name: 1,
        description: 1,
        status: 1,
        createdAt: 1,
        modifiedAt: 1,
        abilities: 1,
        since: 1,
        to: 1
      }
    })

    ctx.resolve({
      projects
    })
  } catch (err) {
    ctx.fail('Get Projects error', err)
  }
}

export default list
