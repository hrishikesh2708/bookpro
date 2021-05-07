import allReducers from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from "localforage";
// import axios from "axios"
offlineConfig.persistOptions = { storage: localforage }






// const effect = (effect, _action) => {
//   console.log(effect)
//   return axios(effect);
// }
// const discard = (error, _action, _retries) => {
//   const { request, response } = error;
//   if (!request) throw error; // There was an error creating the request
//   if (!response) return false; // There was no response
//   return 400 <= response.status && response.status < 500;
// };

// const store = createStore(myReducer, );

const newstore = createStore(
  allReducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // offline({
    //   ...offlineConfig,
    //   effect: ({ url, ...options }) => {
    //     console.log(options,url);
    //     var body = options.body;
    //     var data; 
    //     if(body){
    //         try {
    //            data = JSON.parse(body);
    //         } 
    //         catch (err) {
    //            if (typeof body == 'string'){ 
    //             data = body;
    //            }
    //            else{ 
    //             console.log(err);
    //            }
    //         }
    //     }
    //     return axios({
    //       method: options.method,
    //       url: url,
    //       data: data,
    //       headers: options.headers
    //     })
    //     .then(function (response) {
    //         return response.data;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });                    
    //   }
    // })
    offline(offlineConfig)
    
  )
);
// console.log(newstore);


export default newstore;

