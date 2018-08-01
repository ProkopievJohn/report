import Client from 'socket.io-client'
import { SOCKET } from '../constants'

export default function socketConnector(next) {
  return (reducer, initialState, enhancer) => {
    const store = next(reducer, initialState, enhancer)
    const socket = Client(process.env.SOCKET_URL)

    if (module.hot) {
      module.hot.status(state => {
        console.log(state)
        if (state === 'apply') {
          socket.close()
        }
      })
    }

    socket.on('connect', () => store.dispatch({
      type: SOCKET.CONNECT.SUCCESS
    }))

    socket.on('event', payload => store.dispatch({
      type: SOCKET.EVENT.REQUEST,
      payload
    }))

    socket.on('disconnect', () => store.dispatch({
      type: SOCKET.DISCONNECT.SUCCESS
    }))

    return {
      ...store,
      socket
    }
  }
}
