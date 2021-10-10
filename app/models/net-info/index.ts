import {types, flow} from 'mobx-state-tree';
import NetInfo from '@react-native-community/netinfo';

export const NetInfoStore = types
  .model({
    netType: types.optional(types.string, ''),
    isConnected: types.optional(types.boolean, false),
    isInternetReachable: types.optional(types.boolean, false),
    details: types.optional(types.string, ''),
  })
  .actions(self => ({
    afterCreate: flow(function* afterCreate() {
      NetInfo.configure({
        // reachabilityUrl: 'https://clients3.google.com/generate_204',
        reachabilityUrl: 'https://www.alskdjfasnnasdfklasjdf.com/',
        reachabilityTest: async response => response.status === 200,
        reachabilityLongTimeout: 60 * 1000, // 60s
        reachabilityShortTimeout: 5 * 1000, // 5s
        reachabilityRequestTimeout: 15 * 1000, // 15s
      });

      console.log('subscribe to netinfo');
      const unsubscribe = NetInfo.addEventListener(state => {
        self.setFields(state);
        console.log('netinfo', {self});
      });
      console.log({unsubscribe});
    }),
    setFields: function (state) {
      self.netType = state.type;
      self.isConnected = state.isConnected || false;
      self.isInternetReachable = state.isInternetReachable || false;
      self.details = JSON.stringify(state.details);
    },
  }))
  .views(self => ({
    vAll() {
      const {netType, isConnected, isInternetReachable, details} = self;
      return {
        netType,
        isConnected,
        isInternetReachable,
        details,
      };
    },
  }));
