import {types, flow} from 'mobx-state-tree';
import {
  getTokenFromCreds,
  validateToken,
} from '../../utils/auth-utils/auth-functions';
import {LoginForm} from '../forms';

export const Session = types
  .model({
    token: types.optional(types.string, ''),
    isLoggedIn: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, true),
    form: LoginForm,
  })
  .actions(self => ({
    init: flow(function* init() {
      console.log('init session');
      self.isLoading = true;
      self.isLoggedIn = false;
      try {
        // TODO: refactor when local store is introduced
        yield validateToken(self.token);
        // self = {...self, token, isLoading: false, isLoggedIn: true}
        self.isLoggedIn = true;
        self.isLoading = false;
      } catch (e) {
        self.isLoggedIn = false;
        self.isLoading = false;
      }
    }),
    signIn: flow(function* signIn() {
      const {username, password} = self.form;
      self.form.setLoading(true, '');
      self.isLoggedIn = false;

      try {
        const token = yield getTokenFromCreds({username, password});
        self.token = token;
        self.isLoggedIn = true;
        self.form.setLoading(false);
      } catch (e) {
        self.form.message = e.message;
        self.isLoggedIn = false;
        self.form.setLoading(false, e.message);
      }
    }),
    signOut: flow(function* signOut() {
      console.log('singing out');
      self.isLoading = true;

      // delete stuff
      self.form.password = '';
      try {
        yield new Promise(resolve => {
          setTimeout(() => {
            resolve({});
          }, 2000);
        });
      } catch (e) {}

      self.token = '';
      self.isLoggedIn = false;
      self.isLoading = false;
    }),
  }))
  .views(self => ({
    vToken() {
      return self.token;
    },
    vIsLoggedin() {
      return self.isLoggedIn;
    },
    vIsLoading() {
      return self.isLoading;
    },
  }));
