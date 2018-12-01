import { Map, List } from 'immutable'

import { AUTH, LOGOUT, PROJECT } from 'appConstants'

const initialState = new Map({
  loading: false,
  error: null,
  data: new List()
})

export default function projects(state = initialState, action) {
  switch (action.type) {
    case PROJECT.REQUEST:
      return state
        .set('loading', true)
        .set('error', null)
    case PROJECT.FAIL:
      return state
        .set('loading', false)
        .set('error', action.payload)
    case PROJECT.SUCCESS:
      return state
        .set('loading', false)
        .set(
          'data',
          List(action.payload.projects.map(project => Map(project)))
        )
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return initialState
    default:
      return state
  }
}
