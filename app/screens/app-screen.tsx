import React from 'react';
import {observer} from 'mobx-react-lite';
import {SafeAreaView, StatusBar, ScrollView, View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text} from '../components';
import {useStores} from '../models';

const SettingsScreen = observer(() => {
  const {session, logs} = useStores();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      <Button
        onPress={() => {
          logs.log('log out');
          session.signOut();
        }}
        title="logout"
      />
      <View>
        <Text>{JSON.stringify(logs.logs)}</Text>
      </View>
    </View>
  );
});

function FirstScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>First!</Text>
    </View>
  );
}

const HomeScreen = observer(() => {
  const {netInfo} = useStores();

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hi there</Text>
        </View>
        <View>
          <Text>{JSON.stringify(netInfo.vAll())}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const Tab = createBottomTabNavigator();
export const AppScreen = observer(() => {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen name="first" component={FirstScreen} />
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
});
