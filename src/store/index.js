import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let Store;

if (process.env.NODE_ENV === 'production') {
  Store = createStore( rootReducer, applyMiddleware(sagaMiddleware) );
} else {
  Store = createStore( rootReducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools) );  
}



sagaMiddleware.run(rootSaga);

export default Store;

