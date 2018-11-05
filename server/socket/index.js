import JWT from 'jsonwebtoken'
import Socket from 'socket.io'
import config from '../../config/server'

export default function startSocket() {
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

  const executeNotify = (topic, event, companyId) => {
    if (companies.hasOwnProperty(companyId)) {
      Object.keys(companies[companyId]).forEach(userId => notifyMany(topic, event, companies[companyId][userId]))
    }
  }

  io.on('connection', socket => {
    console.log('[SOCKET] Connected ', socket.id)

    socket.on('auth', data => {
      const { token: dataToken } = data

      const token = JWT.verify(dataToken, config.jwt.public, config.jwt.opts)
      const socketId = socket.id
      const userId = token._id
      const companyId = token.company.companyId

      console.log(`[SOCKET] Auth from ${socketId} for user ${userId}`)

      if (!companies[companyId]) {
        companies[companyId] = {}
      }

      if (!companies[companyId][userId]) {
        companies[companyId][userId] = {}
      }

      companies[companyId][userId][socketId] = true

      socket.userId = userId
      socket.companyId = companyId
    })

    socket.on('system', data => {
      const { token, workerId } = data

      if (config.socket.systemToken === token) {
        socket.verifiedToken = token
        socket.workerId = workerId
        if (workers[workerId]) {
          console.warn(`[SOCKET] Worker #${workerId} is connected twice for some reason`)
        }
        workers[workerId] = socket.id
        console.log(`[SOCKET] Worker #${workerId} connected to socket server`)
      }
    })

    socket.on('notify', data => {
      if (!socket.verifiedToken) {
        console.log(`[SOCKET] Hacking attempt from socket #${socket.id}`, socket, data)
      } else {
        const { topic, event, companyId } = data
        executeNotify(topic, event, companyId)
      }
    })

    const onLeave = () => {
      console.log(`[SOCKET] disconnect ${socket.id} for user ${socket.userId} and company ${socket.companyId}`)
      if (socket.userId &&
        socket.companyId &&
        companies[socket.companyId] &&
        companies[socket.companyId][socket.userId]
      ) {
        delete companies[socket.companyId][socket.userId][socket.id]
      }
      if (socket.workerId) {
        console.log(`[SOCKET] Worker #${socket.workerId} is disconected from socket server`)
        delete workers[socket.workerId]
      }
      delete socket.userId
      delete socket.companyId
      delete socket.workerId
      delete socket.verifiedToken
    }

    socket.on('leave', onLeave)
    socket.on('disconnect', onLeave)
  })

  io.listen(config.socket.port)
}
