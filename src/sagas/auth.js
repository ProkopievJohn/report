import { fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'connected-react-router'

import { AUTH, LOGOUT, ABILITY, PROJECT, USER, ACTIVITY } from 'appConstants'
import { callApi, setToken, callSecureApi, getToken } from './api'

function* login(action) {
  yield put(startSubmit('LoginForm'))
  const response = yield call(callApi, 'public/login', {
    method: 'POST',
    body: action.payload
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: AUTH.DONE.REQUEST, payload })
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
    yield put({ type: AUTH.DONE.REQUEST, payload })
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

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: AUTH.DONE.REQUEST, payload })
  } else {
    yield put({
      type: LOGOUT.REQUEST,
      payload
    })
  }
}

function* authDone({ payload }) {
  yield setToken(payload.token)
  yield put({ type: AUTH.DONE.SUCCESS, payload })

  yield put({ type: ABILITY.REQUEST })
  yield put({ type: PROJECT.REQUEST })
  yield put({ type: USER.REQUEST })
  yield put({ type: ACTIVITY.REQUEST })
}

export default function* authSaga(store) {
  yield fork(takeEvery, AUTH.REQUEST, login)
  yield fork(takeEvery, AUTH.REGISTER.REQUEST, register)
  yield fork(takeEvery, LOGOUT.REQUEST, logout)
  yield fork(takeEvery, AUTH.VERIFY.REQUEST, verifyToken)
  yield fork(takeLatest, AUTH.DONE.REQUEST, authDone)
  if (store.getState().auth.token) {
    yield put({
      type: AUTH.VERIFY.REQUEST,
      payload: {
        token: store.getState().auth.token
      }
    })
  }
}
