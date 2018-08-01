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

export const SOCKET = {
  ...createActionConstants('SOCKET'),
  CONNECT: createActionConstants('SOCKET.CONNECT'),
  EVENT: createActionConstants('SOCKET.EVENT'),
  DISCONNECT: createActionConstants('SOCKET.DISCONNECT')
}
