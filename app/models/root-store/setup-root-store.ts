import {RootStoreModel, RootStore} from './root-store';
import * as storage from '../../utils/storage';
import {onSnapshot} from 'mobx-state-tree';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root';

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;
  // TODO: hydrate store here

  // await storage.clear();
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {
      session: {form: {}},
      netInfo: {},
      logs: {},
    };
    rootStore = RootStoreModel.create({
      ...data,
      session: {...data.session, isLoading: true},
    });
  } catch (e) {
    console.error(e);
    throw e;
    // TODO: gracefully handle
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot =>
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  );

  return rootStore;
}
