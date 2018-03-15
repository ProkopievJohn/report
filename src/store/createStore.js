import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import saga from '../sagas'
import persistentStorage from './persistentStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const reducer = combineReducers({
    ...reducers,
    form,
    router: routerReducer
  })
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        createLogger()
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
