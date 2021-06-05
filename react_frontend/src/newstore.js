import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux"
import user_reducer from "./reducer/user_reducer"
import {set_reducer} from "./reducer/books_reducer"
// import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from "localforage";
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: ['user'] 
};
const persistConfigUser = {
  key: 'user',
  storage: localforage,
  blacklist: ['set'] 
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const allReducers = combineReducers({
  user: persistReducer(persistConfigUser, offlineEnhanceReducer(user_reducer)),
  set: set_reducer,
})
const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(allReducers)
);

  export const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(thunk, offlineMiddleware)
    )
  );
  export const persistor = persistStore(store);



