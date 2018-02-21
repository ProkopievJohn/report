import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { AUTH, REGISTER } from '../constants'
import { callApi, setToken } from './api'

function* login(action) {
  yield put(startSubmit('LoginForm'))
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
    yield put(stopSubmit('LoginForm'))
  } else {
    yield put({
      type: AUTH.FAIL,
      payload
    })
    yield put(stopSubmit('LoginForm', {
      _error: payload.message
    }))
  }
}

function* register(action) {
  yield put(startSubmit('RegisterForm'))

  const response = yield call(callApi, 'public/register', {
    method: 'POST',
    body: action.payload
  })

  const { payload = {} } = response.payload
  if (response.ok) {
    yield put({
      type: REGISTER.SUCCESS,
      payload: {
        ...payload
      }
    })
    yield put(stopSubmit('RegisterForm'))
  } else {
    yield put({
      type: REGISTER.FAIL,
      payload
    })
    yield put(stopSubmit('RegisterForm', {
      _error: payload.message
    }))
  }
}

export default function* authSaga(store) {
  yield fork(takeEvery, AUTH.REQUEST, login)
  yield fork(takeEvery, REGISTER.REQUEST, register)
}
