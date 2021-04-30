import { combineReducers } from "redux"
import user_reducer from "./user_reducer"
import {set_reducer} from "./books_reducer"

const allReducers = combineReducers({
    user: user_reducer,
    set: set_reducer
})
// export const rootReducer = (state, action) => {
// 	return allReducers(state, action)
// }

export default allReducers;