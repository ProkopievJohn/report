import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { ACTIVITY, UI } from 'appConstants'
import { callSecureApi } from './api'

function* addUserActivity(action) {
  yield put(startSubmit('UserActivityForm'))

  const { to } = action.payload
  const response = yield call(callSecureApi, 'activities', {
    method: 'POST',
    body: {
      ...action.payload,
      to: to.endOf('day')
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ACTIVITY.USER.ADD.SUCCESS, payload })
    yield put(stopSubmit('UserActivityForm'))
    yield put({ type: UI.MODAL.ACTIVITY.USER.ADD.REQUEST })
  } else {
    yield put({ type: ACTIVITY.USER.ADD.FAIL, payload })
    yield put(stopSubmit('UserActivityForm', {
      _error: payload.message || 'Cannot Create User Activity'
    }))
  }
}

export default function* activitiesSaga() {
  yield fork(takeEvery, ACTIVITY.USER.ADD.REQUEST, addUserActivity)
}
