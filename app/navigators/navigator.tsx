import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, AppScreen, LoadingScreen} from '../screens';
import {useStores} from '../models';
import {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

/** Taken from ignite
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  login: undefined;
  app: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator = observer(() => {
  const {session} = useStores();

  useEffect(() => {
    (async function () {
      session.init();
    })();
  }, [session]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
        {session.vIsLoading() ? (
          <Stack.Screen
            name="loading"
            component={LoadingScreen}
            options={{animation: 'fade', headerShown: false}}
          />
        ) : session.vIsLoggedin() ? (
          <Stack.Screen
            name="app"
            component={AppScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
