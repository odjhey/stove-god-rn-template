import React from 'react';
import {View} from 'react-native';
import {Text} from '../components';

export const LoadingScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading</Text>
    </View>
  );
};
