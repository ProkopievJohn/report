import { ObjectID } from 'mongodb'
import { STATUS_ACTIVE, STATUS_DELETED } from '../../../../constants'
import ActivitiesCollection from '../../../../db/activities'
import UsersCollection from '../../../../db/users'
import AbilitiesCollection from '../../../../db/abilities'
import ProjectsCollection from '../../../../db/projects'
import { normalizeDate } from '../../../utils/normalize'

async function create(ctx) {
  const { _id: creatorId, company: { companyId } } = ctx.state.user

  const { userId, projectId, abilityId, hours: pHours, since: pSince, to: pTo } = ctx.request.body

  const since = normalizeDate(pSince)
  const to = normalizeDate(pTo)
  const hours = Number(pHours)

  if (!userId || !projectId || !abilityId || !hours || !since || !to) {
    return ctx.invalidData('Empty Fields')
  }

  try {
    const duplicate = await ActivitiesCollection.findOne({
      companyId,
      userId,
      projectId,
      abilityId,
      status: { $ne: STATUS_DELETED }
    }, { projection: { _id: 1 } })

    if (duplicate) {
      return ctx.conflict('Activity Already Exists')
    }

    const user = UsersCollection.findOne({ _id: ObjectID(userId) }, { projection: { _id: 1 } })

    if (!user) {
      return ctx.invalidData('User does not Exists')
    }

    const project = ProjectsCollection.findOne({ _id: ObjectID(projectId) }, { projection: { _id: 1 } })

    if (!project) {
      return ctx.invalidData('Project does not Exists')
    }

    const ability = AbilitiesCollection.findOne({ _id: ObjectID(abilityId) }, { projection: { _id: 1 } })

    if (!ability) {
      return ctx.invalidData('Ability does not Exists')
    }

    const activity = (await ActivitiesCollection.insertOne({
      createdAt: new Date(),
      modifiedAt: new Date(),
      companyId,
      creatorId,
      userId,
      projectId,
      abilityId,
      since,
      to,
      hours,
      status: STATUS_ACTIVE,
      history: [{
        action: 'created',
        createdAt: new Date(),
        modifiedValues: {}
      }]
    })).ops[0]

    ctx.resolve({ activity })
    ctx.notifyActivity({
      type: 'create',
      companyId,
      activityId: activity._id.toString(),
      userId: activity.userId,
      projectId: activity.projectId,
      abilityId: activity.abilityId
    })
  } catch (err) {
    ctx.fail('Create Activity Error', err)
  }
}

export default create
