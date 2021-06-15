import {
  ADD_BOOK,
  GET_BOOK,
  MODIFY_BOOK,
  SET_STORE,
  DELETE_BOOK,
  SEARCH_RESULT,
  MY_BOOKS,
  ADD_BOOK_SSE_COMMIT,
  MODIFY_BOOK_SSE_COMMIT,
  DELETE_BOOK_SSE_COMMIT,
} from "./type";
import { get_books, get_my_books, dbupdate} from "../api routes/api";

export const get_book = (contents) => ({
  type: GET_BOOK,
  payload: contents,
});
export const book_details = () => {
  return async (dispatch) => {
    try {
      let x = await dbupdate();
      let post = await get_books();
      // console.log("post",post)
      dispatch(set_store(post.data));
    } catch (e) {
      console.log(e);
    }
  };
};
export const search_results = (contents) => ({
  type: SEARCH_RESULT,
  payload: { contents },
});
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
        json: { ...contents.data },
        headers: { token: contents.token },
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
        url: `${process.env.REACT_APP_LOCALHOST}/api/book-modify`,
        method: "PUT",
        json: { ...contents },
        headers: { token: contents.token },
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
      effect: {
        url: `${process.env.REACT_APP_LOCALHOST}/api/book-delete/${contents.id}`,
        method: "DELETE",
        headers: { token: contents.token },
      },
      commit: { type: "DELETE_BOOK_COMMIT" },
      rollback: { type: "DELETE_BOOK_ROLLBACK" },
    },
  },
});

export const private_books = (contents) => {
  return async (dispatch) => {
    try {
      let post = await get_my_books(contents);
      // console.log(post.data.docs)
      dispatch(set_private_book(post.data.docs));
    } catch (e) {
      console.log(e);
    }
  };
};
export const set_private_book = (contents) => ({
  type: MY_BOOKS,
  payload: { contents },
});

export const add_book_commit = (contents) => ({
  type: ADD_BOOK_SSE_COMMIT,
  payload: { ...contents },
});
export const modify_book_commit = (contents) => ({
  type: MODIFY_BOOK_SSE_COMMIT,
  payload: { ...contents },
});
export const delete_book_commit = (_id) => ({
  type: DELETE_BOOK_SSE_COMMIT,
  payload: { _id },
});
