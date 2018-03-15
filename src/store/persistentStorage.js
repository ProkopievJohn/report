import { createStructuredSelector, createSelector } from 'reselect'

const selector = createStructuredSelector({
  auth: createStructuredSelector({
    user: createSelector(state => state.auth.user, user => user),
    token: createSelector(state => state.auth.token, token => token)
  })
})

let fakeStorage

export function getStorage() {
  try {
    localStorage.setItem('testItem', 'test data')
    localStorage.removeItem('testItem')
    return localStorage
  } catch (e) {
    try {
      sessionStorage.setItem('testItem', 'test data')
      sessionStorage.removeItem('testItem')
      return sessionStorage
    } catch (e) {
      if (fakeStorage) {
        return fakeStorage
      }
      // We're in Safari Private Mode
      const obj = {}
      Object.defineProperty(obj, 'setItem', {
        enumerable: false,
        value(key, value) {
          obj[key] = JSON.stringify(value)
        },
        configurable: false
      })
      Object.defineProperty(obj, 'getItem', {
        enumerable: false,
        value(key) {
          return obj[key]
        },
        configurable: false
      })
      Object.defineProperty(obj, 'removeItem', {
        enumerable: false,
        value(key) {
          delete obj[key]
        },
        configurable: false
      })
      Object.defineProperty(obj, 'length', {
        enumerable: false,
        get() {
          return Object.keys(obj)
        },
        configurable: false
      })
      fakeStorage = obj
      return obj
    }
  }
}

export default function persistentStorage(next) {
  const storage = getStorage()
  return (reducer, initialState, extender) => {
    if (storage.hasOwnProperty('localState')) {
      initialState = {
        ...initialState,
        ...JSON.parse(storage.getItem('localState'))
      }
    }
    const store = next(reducer, initialState, extender)
    const checker = createSelector(
      selector,
      data => {
        storage.setItem('localState', JSON.stringify(data))
      }
    )
    store.subscribe(() => {
      checker(store.getState())
    })

    return store
  }
}
