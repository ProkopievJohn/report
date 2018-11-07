import { combineReducers } from 'redux'
import { AUTH, LOGOUT } from 'appConstants'

export function user(state = null, action) {
  switch (action.type) {
    case AUTH.DONE.SUCCESS:
      return action.payload.user
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return null
    default:
      return state
  }
}

export function token(state = null, action) {
  switch (action.type) {
    case AUTH.DONE.SUCCESS:
      return action.payload.token
    case AUTH.DONE.FAIL:
    case LOGOUT.REQUEST:
      return null
    default:
      return state
  }
}

export default combineReducers({
  token,
  user
})
