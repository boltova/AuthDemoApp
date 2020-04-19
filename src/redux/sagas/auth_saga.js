// @flow

import {call, select, put, takeEvery} from 'redux-saga/effects';
import Saga from 'redux-saga';
import * as EmailValidator from 'email-validator';
import * as actions from '../actions';
import rsf from '../rsf';
import {
  SIGNIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNOUT_REQUEST,
} from '../actions/types';
import {strings} from '../../../res/strings';
import * as Keychain from 'react-native-keychain';

function* signInSaga(): Saga<void> {
  const email = yield select(state => state.auth.email);
  const password = yield select(state => state.auth.password);

  const isBiometricEnabled = yield select(
    state => state.auth.isBiometricEnabled,
  );

  if (!EmailValidator.validate(email)) {
    yield put(
      actions.validationsError('emailError', strings.email_validations_error),
    );
    return;
  }

  if (password.length < 6) {
    yield put(
      actions.validationsError(
        'passwordError',
        strings.password_validations_error,
      ),
    );
    return;
  }

  try {
    yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    if (!isBiometricEnabled) {
      Keychain.setGenericPassword(email, password);
    }
    yield put(actions.signInSuccess());
  } catch (error) {
    yield put(actions.signInFail(error.message));
  }
}

function* signUpSaga(): Saga<void> {
  const email = yield select(state => state.auth.email);
  const password = yield select(state => state.auth.password);
  const confirmPassword = yield select(state => state.auth.confirmPassword);

  if (!EmailValidator.validate(email)) {
    yield put(
      actions.validationsError('emailError', strings.email_validations_error),
    );
    return;
  }

  if (password.length < 6) {
    yield put(
      actions.validationsError(
        'passwordError',
        strings.password_validations_error,
      ),
    );
    return;
  }

  if (password !== confirmPassword) {
    yield put(
      actions.validationsError(
        'confirmPasswordError',
        strings.password_confirmation_error,
      ),
    );
    return;
  }

  try {
    yield call(rsf.auth.createUserWithEmailAndPassword, email, password);

    yield put(actions.signInSuccess());
  } catch (error) {
    yield put(actions.signUpFail(error.message));
  }
}

function* signOutSaga(): Saga<void> {
  try {
    yield call(rsf.auth.signOut);
  } catch (error) {
    console.log('SignOut error:', error);
  }
}

export default function* signInRootSaga(): Saga<void> {
  yield takeEvery(SIGNIN_REQUEST, signInSaga);
  yield takeEvery(SIGNUP_REQUEST, signUpSaga);
  yield takeEvery(SIGNOUT_REQUEST, signOutSaga);
}
