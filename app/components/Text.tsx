import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

export const Text: React.FC<TextProps> = props => {
  const {style} = props;
  return (
    <RNText style={[{color: 'darkred'}, style]} {...props}>
      {props.children}
    </RNText>
  );
};
