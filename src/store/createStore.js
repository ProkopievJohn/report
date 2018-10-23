import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import saga from '../sagas'
import persistentStorage from './persistentStorage'
import socketConnector from './socketConnector'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const reducer = combineReducers({
    ...reducers,
    form,
    router
  })
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    composeEnhancers(
      socketConnector,
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        createLogger({
          predicate: (getState, action) => !action.type.includes('@@redux-form')
        })
      ),
      persistentStorage
    )
  )
  sagaMiddleware.run(saga, store)
  return {
    ...store,
    history
  }
}
