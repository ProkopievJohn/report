import client from 'socket.io-client'
import config from '../../config/server'
import setupMiddleware from './middleware'

export default function configureProductionSocket(api, workerId) {
  const socket = client(`http://${config.socket.host}:${config.socket.port}`)

  socket.on('connect', () => {
    socket.emit('system', {
      token: config.socket.systemToken,
      workerId
    })
  })

  const executeNotify = (topic, event, companyId, creator) => socket.emit('notify', {
    topic,
    event,
    companyId,
    creator
  })

  const executeClientNotify = (topic, event, userId) => socket.emit('client:notify', {
    topic,
    event,
    userId
  })

  setupMiddleware({
    api,
    executeNotify,
    executeClientNotify
  })
}
