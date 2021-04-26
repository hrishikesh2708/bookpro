import allReducers from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "set",
  storage: storage,
  whitelist: ["set","user"],
};
const pReducer = persistReducer(persistConfig, allReducers);
const saveState = (state) => {
//   console.log("state", state);
  if (state.client_side.length !== 0) {
    localStorage.setItem("store_state", JSON.stringify(state));
  }
};
// const getstate = () => {
//   try {
//     const s = localStorage.getItem("store_state");

//     if (s === null) return undefined;
//     return JSON.parse(s);
//   } catch (e) {
//     return undefined;
//   }
// };
// const initialState = getstate();

export const store = createStore(
  pReducer,
  [],
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
//   console.log(store);
  saveState({
    client_side: store.getState(),
    // favorites : store.favorites
  });
});
export const persistor = persistStore(store);
// }
// export default store;
