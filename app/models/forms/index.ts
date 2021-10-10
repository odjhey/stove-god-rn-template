import {types} from 'mobx-state-tree';

export const LoginForm = types
  .model({
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    message: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setLoading(loading, message?) {
      self.isLoading = loading;
      if (message !== undefined) {
        self.message = message;
      }
    },
    update(field, value) {
      switch (field) {
        case 'username':
          self.username = value;
          break;
        case 'password':
          self.password = value;
          break;
      }
    },
  }));
