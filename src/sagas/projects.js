import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { PROJECT, UI, SOCKET } from 'appConstants'
import { callSecureApi } from './api'

function* loadProjects() {
  const response = yield call(callSecureApi, 'projects')

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: PROJECT.SUCCESS, payload })
  } else {
    yield put({ type: PROJECT.FAIL, payload })
  }
}

function* addProject(action) {
  yield put(startSubmit('ProjectForm'))
  const { abilities, to } = action.payload
  const response = yield call(callSecureApi, 'projects/', {
    method: 'POST',
    body: {
      ...action.payload,
      abilities: abilities || [],
      to: to.endOf('day')
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
    yield put(stopSubmit('ProjectForm'))
    yield put({ type: UI.MODAL.PROJECT.ADD.REQUEST })
  } else {
    yield put({
      type: PROJECT.ADD.FAIL,
      payload
    })
    yield put(stopSubmit('ProjectForm', {
      _error: payload.message || 'Cannot Create Project'
    }))
  }
}

export default function* projectsSaga() {
  yield fork(takeEvery, PROJECT.REQUEST, loadProjects)
  yield fork(takeEvery, PROJECT.ADD.REQUEST, addProject)
  yield fork(takeEvery, SOCKET.PROJECT.CREATE.REQUEST, loadProjects)
}
