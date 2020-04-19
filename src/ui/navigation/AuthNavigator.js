// @flow

import {createSwitchNavigator} from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export default createSwitchNavigator({
  signIn: SignInScreen,
  signUp: SignUpScreen,
});
