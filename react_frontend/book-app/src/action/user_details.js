import { SET_CURRENT_USER } from "./type"

export const user_details = (contents) => ({
    type: SET_CURRENT_USER,
    payload: {
        USER_ID: contents.decode.id,
        USER_NAME: contents.decode.name,
        USER_CURRENT_STATUS: true,
        USER_TOKEN: contents.token
    },
})