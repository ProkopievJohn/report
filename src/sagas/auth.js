import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'connected-react-router'

import { AUTH, LOGOUT } from 'appConstants'
import { callApi, setToken, callSecureApi, getToken } from './api'

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
        user: payload.user,
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
      _error: payload.message || 'Cannot Login'
    }))
  }
}

function* register(action) {
  yield put(startSubmit('RegisterForm'))

  const body = {
    ...action.payload,
    confirmEmail: undefined,
    confirmPassword: undefined
  }

  const response = yield call(callApi, 'public/register', {
    method: 'POST',
    body
  })

  const { payload } = response.payload
  if (response.ok) {
    yield setToken(payload.token)
    yield put({
      type: AUTH.REGISTER.SUCCESS,
      payload: {
        user: payload.user,
        token: payload.token
      }
    })
    yield put(stopSubmit('RegisterForm'))
    yield put(push('/'))
  } else {
    yield put({
      type: AUTH.REGISTER.FAIL,
      payload
    })
    yield put(stopSubmit('RegisterForm', {
      _error: payload.message || 'Cannot Register'
    }))
  }
}

function* logout(action) {
  const oldToken = getToken()
  yield setToken(null)

  const response = yield call(callApi, 'public/logout', {
    method: 'POST',
    token: oldToken
  })

  const { payload } = response

  if (response.ok) {
    yield put({
      type: LOGOUT.SUCCESS,
      payload
    })
  } else {
    yield put({
      type: LOGOUT.FAIL,
      payload
    })
  }

  yield put(push('/'))
}

function* verifyToken(action) {
  const { token } = action.payload
  const response = yield call(callSecureApi, 'users/token-renew', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    const { payload } = response.payload
    yield setToken(payload.token)
    yield put({
      type: AUTH.VERIFY.SUCCESS,
      payload: {
        user: payload.user,
        token: payload.token
      }
    })
  } else {
    yield put({
      type: LOGOUT.REQUEST,
      payload: response.payload.payload
    })
  }
}

export default function* authSaga(store) {
  yield fork(takeEvery, AUTH.REQUEST, login)
  yield fork(takeEvery, AUTH.REGISTER.REQUEST, register)
  yield fork(takeEvery, LOGOUT.REQUEST, logout)
  yield fork(takeEvery, AUTH.VERIFY.REQUEST, verifyToken)
  if (store.getState().auth.token) {
    yield put({
      type: AUTH.VERIFY.REQUEST,
      payload: {
        token: store.getState().auth.token
      }
    })
  }
}
