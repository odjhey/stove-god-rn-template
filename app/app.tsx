import 'react-native-gesture-handler';

import React from 'react';
import {AppNavigator} from './navigators';
// import {getTokenFromCreds} from './utils/auth-utils/auth-functions';
import {RootStore, RootStoreProvider, setupRootStore} from './models';

export const App = () => {
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(
    undefined,
  );

  // Kick off initial async loading actions, like loading fonts and RootStore
  React.useEffect(() => {
    (async () => {
      await setupRootStore().then(setRootStore);
    })();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore) {
    return null;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <AppNavigator />
    </RootStoreProvider>
  );
};
