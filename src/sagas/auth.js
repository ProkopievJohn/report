import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'react-router-redux'
import { AUTH, REGISTER, LOGOUT } from '../constants'
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
    yield put({
      type: AUTH.VERIFY.SUCCESS,
      payload: {
        token: payload.token,
        user: payload.user
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
  yield fork(takeEvery, REGISTER.REQUEST, register)
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
