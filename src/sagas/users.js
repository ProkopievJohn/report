import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { SOCKET, USER, UI } from 'appConstants'
import { callSecureApi } from './api'

function* loadUsers() {
  const response = yield call(callSecureApi, 'users')

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: USER.SUCCESS, payload })
  } else {
    yield put({ type: USER.FAIL, payload })
  }
}

function* addUser(action) {
  yield put(startSubmit('UserForm'))
  const { abilities } = action.payload
  const response = yield call(callSecureApi, 'users', {
    method: 'POST',
    body: {
      ...action.payload,
      abilities: abilities || []
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({
      type: USER.ADD.SUCCESS,
      payload
    })
    yield put(stopSubmit('UserForm'))
    yield put({ type: UI.MODAL.USER.ADD.REQUEST })
  } else {
    yield put({
      type: USER.ADD.FAIL,
      payload
    })
    yield put(stopSubmit('UserForm', {
      _error: payload.message || 'Cannot Create User'
    }))
  }
}

export default function* usersSaga() {
  yield fork(takeEvery, USER.REQUEST, loadUsers)
  yield fork(takeEvery, USER.ADD.REQUEST, addUser)
  yield fork(takeEvery, SOCKET.USER.CREATE.REQUEST, loadUsers)
}
