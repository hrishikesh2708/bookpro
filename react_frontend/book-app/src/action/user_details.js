import { SET_CURRENT_USER, SET_CURRENT_USER_LOGOUT } from "./type"
import jwt_decode from "jwt-decode";

export const user_details_success = (contents) => ({
    type: SET_CURRENT_USER,
    payload: {
        USER_ID: contents.decode.id,
        USER_NAME: contents.decode.name,
        USER_CURRENT_STATUS: contents.decode.id !== null ? true : false,
        USER_TOKEN: contents.token
    },
})
export const user_logout = (e) => ({
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