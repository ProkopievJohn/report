function createActionConstants(name) {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    FAIL: `${name}.FAIL`
  }
}

export const AUTH = {
  ...createActionConstants('AUTH')
}

export const REGISTER = {
  ...createActionConstants('REGISTER')
}
