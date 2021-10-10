import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Logs} from '../logs';
import {NetInfoStore} from '../net-info';
import {Session} from '../session';

export const RootStoreModel = types.model('RootStore').props({
  session: Session,
  netInfo: NetInfoStore,
  logs: Logs,
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
