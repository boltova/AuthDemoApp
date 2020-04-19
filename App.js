// @flow

import React from 'react';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './src/ui/navigation/AppNavigator';
import store from './src/redux/store';
import {SafeAreaView} from 'react-native';

export default class App extends React.Component<{}> {
  render() {
    const AppContainer = createAppContainer(AppNavigator);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </SafeAreaView>
    );
  }
}
