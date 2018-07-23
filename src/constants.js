function createActionConstants(name) {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    FAIL: `${name}.FAIL`
  }
}

export const AUTH = {
  ...createActionConstants('AUTH'),
  VERIFY: createActionConstants('AUTH.VERIFY')
}

export const LOGOUT = createActionConstants('LOGOUT')

export const REGISTER = {
  ...createActionConstants('REGISTER')
}
