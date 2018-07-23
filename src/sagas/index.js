import { fork } from 'redux-saga/effects'

import authSaga from './auth'

export default function* saga(store) {
  yield fork(authSaga, store)
}
