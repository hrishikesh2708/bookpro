import allReducers from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
// import * as localforage from "localforage";
import logger from "redux-logger";
// offlineConfig.persistOptions = { storage: localforage }

// console.log(offlineConfig)
const newstore = createStore(
  allReducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // offline(offlineConfig)
  )
);


export default newstore;

