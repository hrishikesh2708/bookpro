import { SET_CURRENT_USER } from "./type"
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
export const user_details =  () => {
    return async dispatch => {
        try {
            let token = localStorage.getItem("jwtToken");
            let decode = jwt_decode(token);
            console.log(token,decode)
            dispatch(user_details_success({decode , token}))
        }
        catch(e){
            console.log(e)
        }
    }
}