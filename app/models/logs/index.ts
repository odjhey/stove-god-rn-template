import {types} from 'mobx-state-tree';

export const Logs = types
  .model({
    logs: types.optional(types.array(types.string), []),
  })
  .actions(self => ({
    log: function (text) {
      self.logs.push(`${new Date().toLocaleString()} ${text}`);
    },
  }));
