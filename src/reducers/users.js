import { Map, List } from 'immutable'

import { AUTH, LOGOUT, USER } from 'appConstants'

const initialState = new Map({
  loading: false,
  error: null,
  data: new List()
})

export default function users(state = initialState, action) {
  switch (action.type) {
    case USER.REQUEST:
      return state
        .set('loading', true)
        .set('error', null)
    case USER.FAIL:
      return state
        .set('loading', false)
        .set('error', action.payload)
    case USER.SUCCESS:
      return state
        .set('loading', false)
        .set(
          'data',
          List(action.payload.users.map(user => Map(user)))
        )
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return initialState
    default:
      return state
  }
}
