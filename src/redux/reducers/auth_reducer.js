// @flow

import {
  SIGNIN_FAIL,
  HIDE_EMAIL_ERROR,
  HIDE_PASSWORD_ERROR,
  HIDE_CONFIRM_PASSWORD_ERROR,
  AUTH_VALIDATIONS_ERROR,
  GO_TO_SIGNUP,
  SIGNIN_REQUEST,
  SIGNUP_FAIL,
  HIDE_ERROR,
  SIGNIN_SUCCESS,
  SET_BIOMETRIC_ENABLED,
  SIGNUP_REQUEST,
  SIGNOUT_REQUEST,
} from '../actions/types';

type Action = {
  type: string,
  payload: any,
};

type State = {
  email: string,
  password: string,
  confirmPassword: string,
  emailError: string,
  passwordError: string,
  confirmPasswordError: string,
  loading: boolean,
  error: string,
  showError: boolean,
  isBiometricEnabled: boolean,
  showDashboard: boolean,
};

const INITIAL_STATE: State = {
  email: '',
  password: '',
  confirmPassword: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  loading: false,
  error: '',
  showError: false,
  isBiometricEnabled: false,
  showDashboard: false,
};

export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case HIDE_EMAIL_ERROR:
      return {
        ...state,
        emailError: '',
      };
    case HIDE_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: '',
      };
    case HIDE_CONFIRM_PASSWORD_ERROR:
      return {
        ...state,
        confirmPasswordError: '',
      }; 
    case SIGNIN_REQUEST:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        emailError: '',
        passwordError: '',
        loading: true,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        loading: true,
      };
    case AUTH_VALIDATIONS_ERROR:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        loading: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        email: '',
        password: '',
        confirmPassword: '',
        showDashboard: true,
        loading: false,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        password: '',
        loading: false,
        error: action.payload,
        showError: true,
      };
    case GO_TO_SIGNUP:
      return {
        ...state,
        passwordError: '',
        emailError: '',
        password: '',
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        ...INITIAL_STATE,
        error: action.payload,
        showError: true,
        loading: false,
      };
    case HIDE_ERROR:
      return {
        ...state,
        showError: false,
        error: '',
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
        showDashboard: false,
      };
    case SET_BIOMETRIC_ENABLED:
      return {
        ...state,
        isBiometricEnabled: true,
      };
    default:
      return state;
  }
}
