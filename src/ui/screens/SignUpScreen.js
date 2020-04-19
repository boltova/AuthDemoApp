// @flow

import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {NavigationScreenProps} from 'react-navigation';
import * as actions from '../../redux/actions';
import {TextInput, Alert} from '../components';
import {strings} from '../../../res/strings';
import {styles} from '../styles';

type State = {
  email: string,
  password: string,
  confirmPassword: string,
};
type ReduxProps = {
  email: string,
  password: string,
  error: string,
  loading: boolean,
  emailError: boolean,
  passwordError: boolean,
  showError: boolean,
  showDashboard: boolean,
};

type Props = {
  ...NavigationScreenProps,
  ...ReduxProps,
};

class SignUpScreen extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  componentDidUpdate() {
    if (this.props.showDashboard) {
      this.onAuthComplete();
    }
  }

  onAuthComplete() {
    this.props.navigation.navigate('dashboard');
  }

  onButtonPress() {
    const {email, password, confirmPassword} = this.state;
    this.props.signUpUser(email, password, confirmPassword);
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)} title={strings.signup} />
    );
  }

  changeEmail = (email: string) => {
    if (this.props.emailError) {
      this.props.hideEmailError();
    }
    this.setState({email});
  };

  changePassword = (password: string) => {
    if (this.props.passwordError) {
      this.props.hidePasswordError();
    }
    this.setState({password});
  };

  changeConfirmPassword = (confirmPassword: string) => {
    if (this.props.confirmPasswordError) {
      this.props.hideConfirmPasswordError();
    }
    this.setState({confirmPassword});
  };

  render() {
    return (
      <>
        <View style={styles.containerStyle}>
          <TextInput
            label={strings.email}
            value={this.state.email}
            onChangeText={email => this.changeEmail(email)}
            error={this.props.emailError}
          />

          <TextInput
            secureTextEntry
            label={strings.password}
            value={this.state.password}
            onChangeText={password => this.changePassword(password)}
            error={this.props.passwordError}
          />

          <TextInput
            secureTextEntry
            label={strings.confirm_password}
            value={this.state.confirmPassword}
            onChangeText={password => this.changeConfirmPassword(password)}
            error={this.props.confirmPasswordError}
          />
        </View>

        {this.renderButton()}

        <Alert
          value={this.props.error}
          showAlert={this.props.showError}
          onPress={() => this.props.hideError()}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    error,
    loading,
    emailError,
    passwordError,
    confirmPasswordError,
    showError,
    showDashboard,
  } = state.auth;
  return {
    error,
    loading,
    emailError,
    passwordError,
    confirmPasswordError,
    showError,
    showDashboard,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(SignUpScreen);
