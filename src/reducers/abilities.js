// import { combineReducers } from 'redux'
import { Map, List } from 'immutable'

import { AUTH, LOGOUT, ABILITY } from 'appConstants'

const initialState = new Map({
  loading: false,
  error: null,
  data: new List()
})

export default function abilities(state = initialState, action) {
  switch (action.type) {
    case ABILITY.REQUEST:
      return state
        .set('loading', true)
        .set('error', null)
    case ABILITY.FAIL:
      return state
        .set('loading', false)
        .set('error', action.payload)
    case ABILITY.SUCCESS:
      const { payload } = action
      return state
        .set('loading', false)
        .set(
          'data',
          List(payload.abilities.map(ability => Map(ability)))
        )
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return initialState
    default:
      return state
  }
}
