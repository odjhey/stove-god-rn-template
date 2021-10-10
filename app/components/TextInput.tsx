import React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';

export const TextInput: React.FC<TextInputProps> = props => {
  const {style} = props;
  return (
    <RNTextInput
      style={[
        {
          width: 200,
          color: 'darkred',
          borderWidth: 1,
          borderColor: '#aaa',
          backgroundColor: '#fff',
        },
        style,
      ]}
      {...props}>
      {props.children}
    </RNTextInput>
  );
};
