// @flow

import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import NavigationScreenProps from 'react-navigation';
import {TextInput, Alert} from '../components';
import * as actions from '../../redux/actions';
import {strings} from '../../../res/strings';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import {styles} from '../styles';

type State = {
  email: string,
  password: string,
};

type ReduxProps = {
  error: string,
  loading: boolean,
  emailError: string,
  passwordError: string,
  showError: boolean,
  showDashboard: Boolean,
  isBiometricEnabled: boolean,
};

type Props = {
  ...NavigationScreenProps,
  ...ReduxProps,
};

class SignInScreen extends Component<Props, State> {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    TouchID.isSupported()
      .then(biometryType => {
        if (this.props.isBiometricEnabled) {
          this.showBiometricSignInDialog();
        }
      })
      .catch(error => {
        console.log('Users device does not support Touch ID (or Face ID)');
      });
  }

  componentDidUpdate() {
    if (this.props.showDashboard) {
      this.onAuthComplete();
    }
  }

  showBiometricEnabledDialog(username: string) {
    TouchID.authenticate(`to login with username "${username}"`)
      .then(() => {
        this.props.setBiometricEnabled();
      })
      .catch(error => {
        console.log('TouchID authenticate error or canceled');
      })
      .finally(() => this.props.navigation.navigate('dashboard'));
  }

  showBiometricSignInDialog() {
    Keychain.getGenericPassword().then(credentials => {
      if (!credentials) {
        return;
      }
      const {username, password} = credentials;

      TouchID.authenticate(`to login with username "${username}"`)
        .then(() => {
          this.props.signInUser(username, password);
        })
        .catch(error => {
          console.log('TouchID authenticate error or canceled');
        });
    });
  }

  onAuthComplete() {
    if (!this.props.isBiometricEnabled) {
      this.showBiometricEnabledDialog(this.state.email);
    } else {
      this.props.navigation.navigate('dashboard');
    }
  }

  onSignInButtonPress = () => {
    this.props.signInUser(this.state.email, this.state.password);
  };

  onSignUpButtonPress = () => {
    this.props.showSignUp();
    this.props.navigation.navigate('signUp');
  };

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return <Button onPress={this.onSignInButtonPress} title={strings.signin} />;
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
        </View>

        {this.renderButton()}

        <Button
          onPress={this.onSignUpButtonPress}
          title={strings.signup}
          type="clear"
        />

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
    showError,
    showDashboard,
    isBiometricEnabled,
  } = state.auth;
  return {
    error,
    loading,
    emailError,
    passwordError,
    showError,
    showDashboard,
    isBiometricEnabled,
  };
};

export default connect<Props>(
  mapStateToProps,
  actions,
)(SignInScreen);
