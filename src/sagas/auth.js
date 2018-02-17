import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { AUTH } from '../constants'
import { callApi, setToken } from './api'

function* login(action) {
  const response = yield call(callApi, 'public/login', {
    method: 'POST',
    body: action.payload
  })

  const { payload } = response.payload

  if (response.ok) {
    yield setToken(payload.token)
    yield put({
      type: AUTH.SUCCESS,
      payload: {
        payload: payload.user,
        token: payload.token
      }
    })
  } else {
    yield put({
      type: AUTH.FAIL,
      payload
    })
  }
}

export default function* authSaga(store) {
  yield fork(takeEvery, AUTH.REQUEST, login)
}
