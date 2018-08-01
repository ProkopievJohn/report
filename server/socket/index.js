import JWT from 'jsonwebtoken'
import Socket from 'socket.io'
import { ROLE_USER } from '../constants'
import config from '../../config/server'

export default function startSocket() {
  const clients = {}
  const companies = {}
  const workers = {}

  const io = Socket({
    cookie: false,
    pingTimeout: 10,
    serveClient: false
  })

  const notifyMany = (topic, event, recipients) => {
    Object.keys(recipients).forEach(socketId => {
      io.to(socketId).emit(topic, event)
    })
  }

  const executeNotify = (topic, event, companyId, creator) => {
    if (companies.hasOwnProperty(companyId)) {
      const { admin, user } = companies[companyId]

      Object.keys(admin).forEach(userId => notifyMany(topic, event, admin[userId]))
      Object.keys(user).forEach(userId => notifyMany(topic, event, user[userId]))
    }
  }

  const executeClientNotify = (topic, event, userId) => {
    if (clients.hasOwnProperty(userId)) {
      notifyMany(topic, event, clients[userId])
    }
  }

  io.on('connection', socket => {
    console.log('[SOCKET] Connected ', socket.id)

    socket.on('auth', data => {
      const { companyId, role, token: dataToken } = data

      const token = JWT.verify(dataToken, config.jwt.public, config.jwt.opts)

      console.log(`[SOCKET] Auth from ${socket.id} for user ${token._id}`)

      if (!clients.hasOwnProperty(token._id)) {
        clients[token._id] = {}
      }

      clients[token._id][socket.id] = {
        online: true,
        companyId
      }
      socket.userId = token._id

      if (data.isSafari) {
        socket.alwaysSaveNotify = true
      }

      socket.assignment = {
        companyId,
        role
      }
    })

    socket.on('system', data => {
      const { token, workerId } = data

      if (config.socket.systemToken === token) {
        socket.verifiedToken = token
        socket.workerId = workerId
        if (workers[workerId]) {
          console.log(`[SOCKET] Worker #${workerId} is connected twice for some reason`)
        }
        workers[workerId] = socket.id
        console.log(`[SOCKET] Worker #${workerId} connected to socket server`)
      }
    })

    socket.on('notify', data => {
      if (!socket.verifiedToken) {
        console.log(`[SOCKET] Hacking attempt from socket #${socket.id}`, socket, data)
      } else {
        const { topic, event, companyId, creator } = data
        executeNotify(topic, event, companyId, creator)
      }
    })

    socket.on('client:notify', (data, cb) => {
      if (!socket.verifiedToken) {
        console.log(`[SOCKET] Hacking attempt from socket #${socket.id}`, socket, data)
      } else {
        const { topic, event, userId } = data
        if (clients.hasOwnProperty(userId)) {
          executeClientNotify('event', {
            type: topic,
            ...event,
            muted: event.muted
          }, userId)
        }
        cb && cb()
      }
    })

    const onLeave = () => {
      console.log(`[SOCKET] disconnect ${socket.id} for user ${socket.userId} and company ${socket.assignment && socket.assignment.companyId}`, socket.id, socket.userId)
      if (socket.userId && clients[socket.userId] && clients[socket.userId][socket.id]) {
        delete clients[socket.userId][socket.id]
        console.log('[SOCKET] clients[socket.userId: ', clients[socket.userId])
        if (Object.keys(clients[socket.userId]).length === 0) {
          delete clients[socket.userId]
        }
        console.log('[SOCKET] ', clients, socket.userId, socket.id)
      }
      if (socket.assignment) {
        const { companyId, role } = socket.assignment
        if (role === ROLE_USER) {
          delete companies[companyId].user[socket.userId][socket.id]
        } else {
          delete companies[companyId].admin[socket.userId][socket.id]
        }
      }
      if (socket.workerId) {
        console.log(`[SOCKET] Worker #${socket.workerId} is disconected from socket server`)
        delete workers[socket.workerId]
      }
      delete socket.userId
      delete socket.workerId
      delete socket.assignment
    }

    socket.on('leave', onLeave)
    socket.on('disconnect', onLeave)
  })

  io.listen(config.socket.port)

  return {
    executeNotify,
    executeClientNotify
  }
}
