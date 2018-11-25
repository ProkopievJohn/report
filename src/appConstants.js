function createActionConstants(name) {
  return {
    REQUEST: `${name}.REQUEST`,
    SUCCESS: `${name}.SUCCESS`,
    FAIL: `${name}.FAIL`
  }
}

export const DATE_FORMAT = 'MM-DD-YYYY'
export const TIME_FORMAT = 'HH:mm'

export const STATUS_ACTIVE = 10
export const STATUS_INACTIVE = 20
export const STATUS_DELETED = 100

export const ROLE_ADMIN = 10
export const ROLE_USER = 20

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
    CREATE: createActionConstants('SOCKET.ABILITY.CREATE'),
    UPDATE: createActionConstants('SOCKET.ABILITY.UPDATE'),
    DELETE: createActionConstants('SOCKET.ABILITY.DELETE')
  },
  PROJECT: {
    CREATE: createActionConstants('SOCKET.PROJECT.CREATE')
  },
  USER: {
    CREATE: createActionConstants('SOCKET.USER.CREATE')
  }
}

export const UI = {
  MODAL: {
    PROJECT: {
      ADD: createActionConstants('UI.MODAL.PROJECT.ADD')
    },
    USER: {
      ADD: createActionConstants('UI.MODAL.USER.ADD')
    },
    ABILITY: {
      ADD: createActionConstants('UI.MODAL.ABILITY.ADD'),
      EDIT: createActionConstants('UI.MODAL.ABILITY.EDIT'),
      REMOVE: createActionConstants('UI.MODAL.ABILITY.REMOVE')
    }
  }
}

export const PROJECT = {
  ...createActionConstants('PROJECT'),
  ADD: createActionConstants('PROJECT.ADD')
}

export const USER = {
  ...createActionConstants('USER'),
  ADD: createActionConstants('USER.ADD')
}

export const ABILITY = {
  ...createActionConstants('ABILITY'),
  ADD: createActionConstants('ABILITY.ADD'),
  EDIT: createActionConstants('ABILITY.EDIT'),
  REMOVE: createActionConstants('ABILITY.REMOVE'),
  UPDATED: createActionConstants('ABILITY.UPDATED'),
  DELETED: createActionConstants('ABILITY.DELETED')
}
