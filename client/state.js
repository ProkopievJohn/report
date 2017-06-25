import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

let createStoreWithMiddlewere = applyMiddleware(thunk, createLogger())(createStore);

const store = createStoreWithMiddlewere(reducers);

export default store;
