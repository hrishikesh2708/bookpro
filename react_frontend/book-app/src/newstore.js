import allReducers from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from "localforage";
import logger from "redux-logger";
offlineConfig.persistOptions = { storage: localforage }
// const saveState = (state) => {
//   if (state.client_side.length !== 0) {
//     localStorage.setItem("store_state", JSON.stringify(state));
//   }
// };
console.log(offlineConfig)
const newstore = createStore(
  allReducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    offline(offlineConfig)
  )
);

// newstore.subscribe(() => {
//   //   console.log(store);
//   saveState({
//     client_side: newstore.getState(),
//   });
// });

export default newstore;

