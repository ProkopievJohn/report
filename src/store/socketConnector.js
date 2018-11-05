import io from 'socket.io-client'
import { SOCKET } from 'appConstants'

export default function socketConnector(next) {
  return (reducer, initialState, enhancer) => {
    const store = next(reducer, initialState, enhancer)
    const socket = io(process.env.SOCKET_URL)

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

    socket.on('event', ({ type, payload }) => store.dispatch({
      type: `SOCKET.${type.toUpperCase().replace(/:/g, '.')}.REQUEST`,
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
