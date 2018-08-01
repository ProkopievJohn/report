export default function socketMiddleware(methods) {
  const {
    api,
    executeNotify,
    executeClientNotify
  } = methods

  api.context.notifyCompanyUpdate = payload => {
    const topic = 'event'
    const { companyId, creator } = payload
    const event = {
      type: 'company:update',
      companyId
    }

    executeNotify(topic, event, companyId, creator)
  }

  api.context.notifyUserRegister = payload => {
    const { companyId, userId } = payload

    const event = {
      type: 'company:user:assign',
      companyId,
      userId
    }

    executeNotify('event', event, companyId, userId)
  }

  api.context.notifyUserLogout = payload => {
    const topic = 'event'
    const { companyId, userId, creator } = payload
    const event = {
      type: 'user:logout',
      companyId
    }
    const eventForAllUsers = { ...event, type: 'company:user:logout' }

    executeClientNotify(topic, event, userId)
    executeNotify(topic, eventForAllUsers, companyId, creator)
  }

  api.context.notifyUserRefresh = payload => {
    const topic = 'event'
    const { creator, user } = payload

    user.companies.forEach(company => {
      const { companyId } = company
      const event = {
        type: 'user:refresh',
        companyId,
        user
      }

      executeNotify(topic, event, companyId, creator)
    })
  }
}
