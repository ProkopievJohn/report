import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { PROJECT } from 'appConstants'
import { callSecureApi } from './api'

function* addProject(action) {
  yield put(startSubmit('AddProjectForm'))
  const response = yield call(callSecureApi, 'projects/', {
    method: 'POST',
    body: {
      ...action.payload,
      to: action.payload.to.endOf('day')
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({
      type: PROJECT.ADD.SUCCESS,
      payload: {
        payload: payload.project
      }
    })
    yield put(stopSubmit('AddProjectForm'))
  } else {
    yield put({
      type: PROJECT.ADD.FAIL,
      payload
    })
    yield put(stopSubmit('AddProjectForm', {
      _error: payload.message
    }))
  }
}

export default function* projectsSaga() {
  yield fork(takeEvery, PROJECT.ADD.REQUEST, addProject)
}
