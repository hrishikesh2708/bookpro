import {
  ADD_BOOK,
  GET_BOOK,
  MODIFY_BOOK,
  SET_STORE,
  DELETE_BOOK,
} from "./type";
import { get_books } from "../api routes/api";

export const get_book = (contents) => ({
  type: GET_BOOK,
  payload: contents,
});
export const book_details = () => {
  return async (dispatch) => {
    try {
      let post = await get_books();
      // console.log("post",post)
      dispatch(set_store(post.data));
    } catch (e) {
      console.log(e);
    }
  };
};
export const set_store = (contents) => ({
  type: SET_STORE,
  payload: { contents },
});
export const add_book = (contents) => ({
  type: ADD_BOOK,
  payload: { contents },
  meta: {
    offline: {
      effect: {
        url: `${process.env.REACT_APP_LOCALHOST}/api/book-addition`,
        method: "POST",
        json: { ...contents },
      },
      commit: { type: "ADD_BOOK_COMMIT" },
      rollback: { type: "ADD_BOOK_ROLLBACK", meta: {} },
    },
  },
});
export const modify_book = (contents) => ({
  type: MODIFY_BOOK,
  payload: { ...contents },
  meta: {
    offline: {
      effect: {
        url: `${process.env.REACT_APP_LOCALHOST}/api/book-modify/as${contents.token}`,
        method: "PUT",
        // json: { ...contents.data },
        json: { ...contents },
      },
      commit: { type: "MODIFY_BOOK_COMMIT" },
      rollback: { type: "MODIFY_BOOK_ROLLBACK" },
    },
  },
});
export const delete_book = (contents) => ({
  type: DELETE_BOOK,
  payload: { contents },
  meta: {
      offline: {
        effect: { url: `${process.env.REACT_APP_LOCALHOST}/api/book-delete/${contents.id}/${contents.token}`, method: 'DELETE' },
        commit: { type: 'DELETE_BOOK_COMMIT' },
        rollback: { type: 'DELETE_BOOK_ROLLBACK'}
      }
    }
});
