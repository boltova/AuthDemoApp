// @flow

import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
import rootSaga from '../sagas';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const reducer = persistCombineReducers(config, reducers);

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

persistStore(store, null, () => {
  store.getState();
});

export default store;
