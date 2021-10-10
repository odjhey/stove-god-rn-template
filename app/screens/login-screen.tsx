import React from 'react';
import {View, Button} from 'react-native';
import {observer} from 'mobx-react-lite';

import {Text, TextInput} from '../components';
import {useStores} from '../models';

export const LoginScreen = observer(() => {
  const {session, logs} = useStores();

  const onChangeText = (field, text) => {
    session.form.update(field, text);
  };

  function execSignIn() {
    logs.log('login');
    session.signIn();
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TextInput
        value={session.form.username}
        autoCapitalize="none"
        onChangeText={text => {
          onChangeText('username', text);
        }}
      />
      <TextInput
        value={session.form.password}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={text => {
          onChangeText('password', text);
        }}
      />
      <Button
        disabled={session.form.isLoading}
        title="Login"
        onPress={() => execSignIn()}
      />
      <Text>{session.form.message}</Text>
    </View>
  );
});
