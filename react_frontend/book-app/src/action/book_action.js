import { ADD_BOOK, GET_BOOK, MODIFY_BOOK, SET_STORE} from "./type"

export const get_book = (contents) => ({
    type: GET_BOOK,
    payload: contents
})
export const set_store = (contents) => ({
    type: SET_STORE,
    payload: contents
})
export const add_book = (contents) => ({
    type: ADD_BOOK,
    payload: contents,
    meta: {
        offline: {
          effect: { url: `${process.env.REACT_APP_LOCALHOST}/api/book-addition`, method: 'POST', json: { contents } },
        //   commit: { type: 'ADD_BOOK', meta: { contents } },
        //   rollback: { type: '', meta: {  } }
        }
      }
})
export const modify_book = (contents) => ({
    type: MODIFY_BOOK,
    payload: contents
})