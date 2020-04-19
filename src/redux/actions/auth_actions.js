// @flow

import {
  HIDE_EMAIL_ERROR,
  HIDE_PASSWORD_ERROR,
  HIDE_CONFIRM_PASSWORD_ERROR,
  AUTH_VALIDATIONS_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_REQUEST,
  GO_TO_SIGNUP,
  SIGNUP_REQUEST,
  HIDE_ERROR,
  SIGNUP_FAIL,
  SIGNOUT_REQUEST,
  SET_BIOMETRIC_ENABLED,
} from './types';

export const hideEmailError = () => ({
  type: HIDE_EMAIL_ERROR,
});

export const hidePasswordError = () => ({
  type: HIDE_PASSWORD_ERROR,
});

export const hideConfirmPasswordError = () => ({
  type: HIDE_CONFIRM_PASSWORD_ERROR,
});

export const validationsError = (prop: string, value: string) => ({
  type: AUTH_VALIDATIONS_ERROR,
  payload: {prop, value},
});

export const signInUser = (email: string, password: string) => ({
  type: SIGNIN_REQUEST,
  payload: {email, password},
});

export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS,
});

export const signInFail = (error: string) => ({
  type: SIGNIN_FAIL,
  payload: error,
});

export const signUpFail = (error: string) => ({
  type: SIGNUP_FAIL,
  payload: error,
});

export const showSignUp = () => ({
  type: GO_TO_SIGNUP,
});

export const signUpUser = (
  email: string,
  password: string,
  confirmPassword: string,
) => ({
  type: SIGNUP_REQUEST,
  payload: {email, password, confirmPassword},
});

export const hideError = () => ({
  type: HIDE_ERROR,
});

export const signOutUser = () => ({
  type: SIGNOUT_REQUEST,
});

export const setBiometricEnabled = () => ({
  type: SET_BIOMETRIC_ENABLED,
});
