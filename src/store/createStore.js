import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import saga from './sagas'

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
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
      createLogger()
    )
  )
  sagaMiddleware.run(saga, store)
  return {
    ...store,
    history
  }
}
