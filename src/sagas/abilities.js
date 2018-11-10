import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { ABILITY, SOCKET, UI } from 'appConstants'
import { callSecureApi } from './api'

function* addAbility(action) {
  yield put(startSubmit('AbilityForm'))
  const response = yield call(callSecureApi, 'abilities', {
    method: 'POST',
    body: {
      name: action.payload.name.trim().toUpperCase(),
      description: (action.payload.description || '').trim()
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ABILITY.ADD.SUCCESS, payload })
    yield put(stopSubmit('AbilityForm'))
    yield put({ type: UI.MODAL.ABILITY.ADD.REQUEST })
  } else {
    yield put({ type: ABILITY.ADD.FAIL, payload })
    yield put(stopSubmit('AbilityForm', {
      _error: payload.message || 'Cannot Create Ability'
    }))
  }
}

function* loadAbilities() {
  const response = yield call(callSecureApi, 'abilities')

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ABILITY.SUCCESS, payload })
  } else {
    yield put({ type: ABILITY.FAIL, payload })
  }
}

function* editAbility(action) {
  yield put(startSubmit('AbilityForm'))
  const { _id, name, description } = action.payload
  const response = yield call(callSecureApi, `abilities/${_id}`, {
    method: 'POST',
    body: {
      name: name.trim().toUpperCase(),
      description: (description || '').trim()
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ABILITY.EDIT.SUCCESS, payload })
    yield put(stopSubmit('AbilityForm'))
    yield put({ type: UI.MODAL.ABILITY.EDIT.REQUEST })
  } else {
    yield put({ type: ABILITY.EDIT.FAIL, payload })
    yield put(stopSubmit('AbilityForm', {
      _error: payload.message || 'Cannot Edit Ability'
    }))
  }
}

function* updateAbility(action) {
  yield put({ type: ABILITY.UPDATED.REQUEST })
  const { abilityId } = action.payload
  const response = yield call(callSecureApi, `abilities/${abilityId}`)

  const { payload } = response.payload

  if (response.ok) {
    yield put({ type: ABILITY.UPDATED.SUCCESS, payload })
  } else {
    yield put({ type: ABILITY.UPDATED.FAIL, payload })
  }
}

function* removeAbility(action) {
  yield put(startSubmit('AbilityForm'))
  const { _id } = action.payload

  const response = yield call(callSecureApi, `abilities/${_id}`, {
    method: 'DELETE'
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({
      type: ABILITY.REMOVE.SUCCESS,
      payload
    })
    yield put({ type: UI.MODAL.ABILITY.REMOVE.REQUEST })
    yield put(stopSubmit('AbilityForm'))
  } else {
    const { message } = payload

    yield put({
      type: ABILITY.REMOVE.FAIL,
      payload
    })

    yield put(stopSubmit('AbilityForm', {
      _error: message || 'Cannot Delete Ability'
    }))
  }
}

function* deleteAbility(action) {
  yield put({ type: ABILITY.DELETED.SUCCESS, payload: action.payload })
}

export default function* abilitiesSaga() {
  yield fork(takeEvery, ABILITY.REQUEST, loadAbilities)
  yield fork(takeEvery, ABILITY.ADD.REQUEST, addAbility)
  yield fork(takeEvery, ABILITY.EDIT.REQUEST, editAbility)
  yield fork(takeEvery, ABILITY.REMOVE.REQUEST, removeAbility)
  yield fork(takeEvery, SOCKET.ABILITY.CREATE.REQUEST, loadAbilities)
  yield fork(takeEvery, SOCKET.ABILITY.UPDATE.REQUEST, updateAbility)
  yield fork(takeEvery, SOCKET.ABILITY.DELETE.REQUEST, deleteAbility)
}
