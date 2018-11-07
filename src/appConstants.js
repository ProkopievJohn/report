function createActionConstants(name) {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    FAIL: `${name}.FAIL`
  }
}

export const DATE_FORMAT = 'MM-DD-YYYY'
export const TIME_FORMAT = 'HH:mm'

export const AUTH = {
  ...createActionConstants('AUTH'),
  DONE: createActionConstants('AUTH.DONE'),
  REGISTER: createActionConstants('AUTH.REGISTER'),
  VERIFY: createActionConstants('AUTH.VERIFY')
}

export const LOGOUT = createActionConstants('LOGOUT')

export const SOCKET = {
  ...createActionConstants('SOCKET'),
  CONNECT: createActionConstants('SOCKET.CONNECT'),
  DISCONNECT: createActionConstants('SOCKET.DISCONNECT'),
  ABILITY: {
    CREATE: createActionConstants('SOCKET.ABILITY.CREATE')
  }
}

export const UI = {
  MODAL: {
    PROJECT: {
      ADD: createActionConstants('UI.MODAL.PROJECT.ADD')
    },
    ABILITY: {
      ADD: createActionConstants('UI.MODAL.ABILITY.ADD')
    }
  }
}

export const PROJECT = {
  ...createActionConstants('PROJECT'),
  ADD: createActionConstants('PROJECT.ADD')
}

export const ABILITY = {
  ...createActionConstants('ABILITY'),
  ADD: createActionConstants('ABILITY.ADD')
}
