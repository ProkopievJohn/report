import { combineReducers } from 'redux'
import { UI, SOCKET } from 'appConstants'

export function makeToggleReducer(actionConst, defaultValue = false) {
  return (state = defaultValue, action) => {
    switch (action.type) {
      case actionConst.REQUEST:
        return !state
      default:
        return state
    }
  }
}

const project = combineReducers({
  add: makeToggleReducer(UI.MODAL.PROJECT.ADD)
})

export function offlineTime(state = 0, action) {
  switch (action.type) {
    case SOCKET.CONNECT.SUCCESS:
      if (state) {
        const diff = (new Date().getTime() - state) / 1000
        if (diff > 10) {
          return diff
        }
      }
      return 0
    case SOCKET.DISCONNECT.SUCCESS:
      return new Date() * 1
    default:
      return state
  }
}

export default combineReducers({
  project,
  offlineTime
})
