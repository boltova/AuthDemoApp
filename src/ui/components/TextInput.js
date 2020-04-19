// @flow

import React from 'react';
import {Input} from 'react-native-elements';

type Props = {
  label: string,
  value: string,
  onChangeText: (text: string) => void,
  secureTextEntry?: boolean,
  error?: string,
};

const TextInput = (props: Props) => {

  return (
    <Input
      placeholder={props.label}
      errorStyle={{color: 'red'}}
      errorMessage={props.error}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export {TextInput};
