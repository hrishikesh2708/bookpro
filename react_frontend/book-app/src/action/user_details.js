import { SET_CURRENT_USER, SET_CURRENT_USER_LOGOUT } from "./type"
import jwt_decode from "jwt-decode";
import {book_details} from "./book_action"

export const user_details_success = (contents) => ({
    type: SET_CURRENT_USER,
    payload: {contents},
})
export const user_logout = () => ({
    type: SET_CURRENT_USER_LOGOUT,
    payload: {
        USER_ID: "",
        USER_NAME: "" ,
        USER_CURRENT_STATUS: false,
        USER_TOKEN: ""
    },
})
export const user_details =  () => {
    return async dispatch => {
        try {
            let token = localStorage.getItem("jwtToken");
            let decode = jwt_decode(token);
            dispatch(user_details_success({decode , token}))
        }
        catch(e){
            console.log(e)
        }
    }
}
// export const user_details = () => async (dispatch) => {
//     let token = localStorage.getItem("jwtToken");
//     // console.log(token)
//     let decode = jwt_decode(token);
//     await Promise.all([
//         dispatch(user_details_success({decode , token})),
//       ]);

  
//     return dispatch(book_details());
//   };
  