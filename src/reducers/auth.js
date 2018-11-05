import { combineReducers } from 'redux'
import { AUTH, LOGOUT } from 'appConstants'

export function user(state = null, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
    case AUTH.VERIFY.SUCCESS:
    case AUTH.REGISTER.SUCCESS:
      return action.payload.user
    case AUTH.FAIL:
    case AUTH.VERIFY.FAIL:
    case AUTH.REGISTER.FAIL:
    case LOGOUT.REQUEST:
      return null
    default:
      return state
  }
}

export function token(state = null, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
    case AUTH.VERIFY.SUCCESS:
    case AUTH.REGISTER.SUCCESS:
      return action.payload.token
    case AUTH.FAIL:
    case AUTH.VERIFY.FAIL:
    case AUTH.REGISTER.FAIL:
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
