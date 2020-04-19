// @flow

import React, {Component} from 'react';
import {AppState} from 'react-native';
import NavigationScreenProps from 'react-navigation';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions';

type Props = {
  ...NavigationScreenProps,
};

type State = {
  appState: ?string,
};

class DashboardScreen extends Component<Props, State> {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    const {appState} = this.state;
    if (
      appState &&
      appState.match(/active/) &&
      nextAppState === ('inactive' || 'background')
    ) {
      this.props.signOutUser();
    }
    this.setState({appState: nextAppState});
  };

  render() {
    return (
      <>
        <Text style={{alignSelf: 'center'}}>Welcome!</Text>
      </>
    );
  }
}

export default connect(
  null,
  actions,
)(DashboardScreen);
