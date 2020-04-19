// @flow

import {createSwitchNavigator} from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import AuthNavigator from './AuthNavigator';

const hideTabBarOptions = {tabBarVisible: false};

export default createSwitchNavigator({
  auth: {
    screen: AuthNavigator,
    navigationOptions: hideTabBarOptions,
  },
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: hideTabBarOptions,
  },
});
