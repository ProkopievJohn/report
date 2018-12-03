import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { ACTIVITY, UI, SOCKET } from 'appConstants'
import { callSecureApi } from './api'

function* loadActivities() {
  const response = yield call(callSecureApi, 'activities')

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ACTIVITY.SUCCESS, payload })
  } else {
    yield put({ type: ACTIVITY.FAIL, payload })
  }
}

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

function* loadActivity(action) {
  const response = yield call(callSecureApi, `activities/${action.payload}`)

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ACTIVITY.CREATED.SUCCESS, payload })
  } else {
    yield put({ type: ACTIVITY.CREATED.FAIL, payload })
  }
}

function* createdActivity(action) {
  yield put({
    type: ACTIVITY.CREATED.REQUEST,
    payload: action.payload.activityId
  })
}

export default function* activitiesSaga() {
  yield fork(takeEvery, ACTIVITY.REQUEST, loadActivities)
  yield fork(takeEvery, ACTIVITY.USER.ADD.REQUEST, addUserActivity)
  yield fork(takeEvery, SOCKET.ACTIVITY.CREATE.REQUEST, createdActivity)
  yield fork(takeEvery, ACTIVITY.CREATED.REQUEST, loadActivity)
}
