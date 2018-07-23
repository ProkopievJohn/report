import { combineReducers } from 'redux'
import { AUTH } from '../constants'

export function user(state = null, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
      return action.payload.payload
    case AUTH.FAIL:
      return null
    default:
      return state
  }
}

export function token(state = null, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
      return action.payload.token
    case AUTH.FAIL:
      return null
    default:
      return state
  }
}

export default combineReducers({
  token,
  user
})
