import { ObjectID } from 'mongodb'
import { STATUS_DELETED } from '../../../../constants'
import ActivitiesCollection from '../../../../db/activities'

async function byId(ctx) {
  const { company: { companyId } } = ctx.state.user
  const { activityId } = ctx.params

  try {
    const request = { _id: ObjectID(activityId), companyId, status: { $ne: STATUS_DELETED } }
    const activity = await ActivitiesCollection.findOne(request)

    if (!activity) {
      return ctx.notFound('Activity Not Found')
    }

    ctx.resolve({ activity })
  } catch (err) {
    ctx.fail('Get Activity Error', err)
  }
}

export default byId
