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
    case ABILITY.UPDATED.REQUEST:
      return state
        .set('loading', true)
        .set('error', null)
    case ABILITY.FAIL:
    case ABILITY.UPDATED.FAIL:
      return state
        .set('loading', false)
        .set('error', action.payload)
    case ABILITY.SUCCESS:
      return state
        .set('loading', false)
        .set(
          'data',
          List(action.payload.abilities.map(ability => Map(ability)))
        )
    case ABILITY.UPDATED.SUCCESS:
      const idx = state.get('data').findIndex(a => a.get('_id') === action.payload.ability._id)
      return state
        .set('loading', false)
        .update('data', data => data.set(idx, Map(action.payload.ability)))
    case ABILITY.DELETED.SUCCESS:
      return state
        .set('loading', false)
        .update('data', data => data.filter(ability => ability.get('_id') !== action.payload.abilityId))
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return initialState
    default:
      return state
  }
}
