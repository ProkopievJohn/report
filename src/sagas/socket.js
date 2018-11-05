import { fork, takeEvery, select } from 'redux-saga/effects'
import { LOGOUT, SOCKET } from 'appConstants'

export function* authWatcher(store) {
  const { socket } = store

  const auth = store.getState().auth
  if (auth.token) {
    socket.emit('auth', {
      token: store.getState().auth.token
    })
  }
}

export function* onLogout(store) {
  const { socket } = store
  socket.emit('leave')
}

export function* reload() {
  const diff = yield select(state => state.ui.offlineTime)
  if (diff > 10) {
    window.location.reload()
  }
}

export default function* configureSaga(store) {
  yield fork(takeEvery, LOGOUT.REQUEST, onLogout)
  yield fork(takeEvery, SOCKET.CONNECT.SUCCESS, reload)
  yield fork(authWatcher, store)
}
