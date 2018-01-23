export function createAction(type) {
  const action = payload => ({
    type: type.REQUEST,
    payload,
    types: type
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
