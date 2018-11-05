import Io from 'socket.io-client'
import config from '../../config/server'
import setupMiddleware from './middleware'

export default function configureSocket(api, workerId) {
  const url = `http://${config.socket.host}:${config.socket.port}/`
  const socket = Io(url)

  socket.on('connect', () => {
    socket.emit('system', {
      token: config.socket.systemToken,
      workerId
    })
  })

  const executeNotify = (topic, event, companyId) => socket.emit('notify', {
    topic,
    event,
    companyId
  })

  setupMiddleware(api, executeNotify)
}
