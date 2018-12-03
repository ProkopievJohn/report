import { STATUS_DELETED } from '../../../../constants'
import ActivitiesCollection from '../../../../db/activities'

async function list(ctx) {
  const { company: { companyId } } = ctx.state.user

  try {
    const request = { companyId, status: { $ne: STATUS_DELETED } }
    const activities = await ActivitiesCollection.find(request)
    ctx.resolve({
      activities
    })
  } catch (err) {
    ctx.fail('Get Activities error', err)
  }
}

export default list
