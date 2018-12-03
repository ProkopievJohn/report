import { Map, List } from 'immutable'

import { AUTH, LOGOUT, ACTIVITY } from 'appConstants'

const initialState = new Map({
  loading: false,
  error: null,
  data: new List()
})

export default function activities(state = initialState, action) {
  switch (action.type) {
    case ACTIVITY.REQUEST:
    case ACTIVITY.CREATED.REQUEST:
      return state
        .set('loading', true)
        .set('error', null)
    case ACTIVITY.CREATED.FAIL:
    case ACTIVITY.FAIL:
      return state
        .set('loading', false)
        .set('error', action.payload)
    case ACTIVITY.SUCCESS:
      return state
        .set('loading', false)
        .set(
          'data',
          List(action.payload.activities.map(activity => Map(activity)))
        )
    case ACTIVITY.CREATED.SUCCESS:
      return state
        .set('loading', false)
        .update('data', data => data.push(Map(action.payload.activity)))
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return initialState
    default:
      return state
  }
}
