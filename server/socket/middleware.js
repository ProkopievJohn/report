export default function socketMiddleware(api, executeNotify) {
  api.context.notifyProject = payload => {
    const { type, companyId, ...res } = payload
    const topic = 'event'
    const event = {
      type: `project:${type}`,
      payload: {
        ...res
      }
    }

    executeNotify(topic, event, companyId)
  }
}
