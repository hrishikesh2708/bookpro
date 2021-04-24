import {VIEW_BOOK, GET_BOOK, SET_STORE} from "./type"

export const view_book = (contents) => ({
    type: VIEW_BOOK,
    payload: contents
})
export const get_book = (contents) => ({
    type: GET_BOOK,
    payload: contents
})
export const set_store = (contents) => ({
    type: SET_STORE,
    payload: contents
})