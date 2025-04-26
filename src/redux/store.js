import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

console.log('redux-thunk module:', require('redux-thunk'));
console.log('thunk:', thunk);

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;