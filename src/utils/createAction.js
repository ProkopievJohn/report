const debug = process.env.NODE_ENV !== 'production'

export function createAction(type) {
  const action = payload => ({
    type: type.REQUEST,
    payload,
    types: type,
    actionCreator: debug ? (new Error()).stack.split('\n') : ''
  })
  action.resolve = payload => ({
    type: type.SUCCESS,
    payload,
    types: type
  })
  action.reject = payload => ({
    type: type.FAIL,
    payload,
    types: type
  })
  return action
}
