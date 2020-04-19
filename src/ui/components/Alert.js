// @flow

import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {strings} from '../../../res/strings';
import {color} from '../../../res/color';

type Props = {
  value: string,
  showAlert: boolean,
  onPress: () => void,
};

const Alert = (props: Props) => {
  return (
    <AwesomeAlert
      show={props.showAlert}
      showProgress={false}
      title={props.value}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText={strings.ok}
      confirmButtonColor={color.main_blue}
      onConfirmPressed={props.onPress}
    />
  );
};

export {Alert};
