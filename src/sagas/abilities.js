import { fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { ABILITY, SOCKET, UI } from 'appConstants'
import { callSecureApi } from './api'

function* addAbility(action) {
  yield put(startSubmit('AddAbilityForm'))
  const response = yield call(callSecureApi, 'abilities', {
    method: 'POST',
    body: {
      name: action.payload.name.trim().toUpperCase(),
      description: (action.payload.description || '').trim()
    }
  })

  const { payload } = response.payload

  if (response.ok) {
    yield put({
      type: ABILITY.ADD.SUCCESS,
      payload: {
        payload: payload.ability
      }
    })
    yield put(stopSubmit('AddAbilityForm'))
    yield put({ type: UI.MODAL.ABILITY.ADD.REQUEST })
  } else {
    yield put({
      type: ABILITY.ADD.FAIL,
      payload
    })
    yield put(stopSubmit('AddAbilityForm', {
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

export default function* abilitiesSaga() {
  yield fork(takeEvery, ABILITY.ADD.REQUEST, addAbility)
  yield fork(takeEvery, ABILITY.REQUEST, loadAbilities)
  yield fork(takeEvery, SOCKET.ABILITY.CREATE.REQUEST, loadAbilities)
}
