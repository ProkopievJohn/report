import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import saga from '../sagas'
import persistentStorage from './persistentStorage'
import socketConnector from './socketConnector'

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const reducer = combineReducers({
    ...reducers,
    form
  })
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    connectRouter(history)(reducer),
    composeEnhancers(
      socketConnector,
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
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
