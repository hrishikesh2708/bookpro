import { combineReducers } from "redux"
import user_reducer from "./user_reducer"
import book_reducer from "./books_reducer"

const allReducers = combineReducers({
    user: user_reducer,
    book: book_reducer
})

export default allReducers;