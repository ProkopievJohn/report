import { fork } from 'redux-saga/effects'

import authSaga from './auth'
import projectsSaga from './projects'
import socketSaga from './socket'

export default function* saga(store) {
  yield fork(authSaga, store)
  yield fork(projectsSaga, store)
  yield fork(socketSaga, store)
}
