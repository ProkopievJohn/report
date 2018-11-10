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

export function abilityId(state = null, action) {
  switch (action.type) {
    case UI.MODAL.ABILITY.EDIT.REQUEST:
    case UI.MODAL.ABILITY.REMOVE.REQUEST:
      return action.payload || null
    default:
      return state
  }
}

const project = combineReducers({
  add: makeToggleReducer(UI.MODAL.PROJECT.ADD)
})

const ability = combineReducers({
  add: makeToggleReducer(UI.MODAL.ABILITY.ADD),
  edit: makeToggleReducer(UI.MODAL.ABILITY.EDIT),
  remove: makeToggleReducer(UI.MODAL.ABILITY.REMOVE),
  id: abilityId
})

export default combineReducers({
  offlineTime,
  project,
  ability
})
