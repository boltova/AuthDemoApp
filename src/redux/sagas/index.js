// @flow

import {all} from 'redux-saga/effects';
import Saga from 'redux-saga';
import signInRootSaga from './auth_saga';

export default function* rootSaga(): Saga<void> {
  yield all([signInRootSaga()]);
}
