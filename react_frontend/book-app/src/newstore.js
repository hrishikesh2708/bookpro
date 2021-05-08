import allReducers from "./reducer";
// import { createStore, applyMiddleware, compose } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import { offline } from '@redux-offline/redux-offline';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from "localforage";
// offlineConfig.persistOptions = { storage: localforage }
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: localforage,
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(allReducers)
);


  export const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(thunk, offlineMiddleware,logger)
    )
  );
  export const persistor = persistStore(store);




// const newstore = createStore(
//   allReducers,
//   {},
//   compose(
//     applyMiddleware(thunk, logger),
//     offline(offlineConfig),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     // offline({
//     //   ...offlineConfig,
//     //   effect: ({ url, ...options }) => {
//     //     console.log(options,url);
//     //     var body = options.body;
//     //     var data; 
//     //     if(body){
//     //         try {
//     //            data = JSON.parse(body);
//     //         } 
//     //         catch (err) {
//     //            if (typeof body == 'string'){ 
//     //             data = body;
//     //            }
//     //            else{ 
//     //             console.log(err);
//     //            }
//     //         }
//     //     }
//     //     return axios({
//     //       method: options.method,
//     //       url: url,
//     //       data: data,
//     //       headers: options.headers
//     //     })
//     //     .then(function (response) {
//     //         return response.data;
//     //     })
//     //     .catch(function (error) {
//     //         console.log(error);
//     //     });                    
//     //   }
//     // })
    
    
//   )
// );
// // console.log(newstore);


// export default newstore;

