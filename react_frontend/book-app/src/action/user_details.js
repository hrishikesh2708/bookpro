import { SET_CURRENT_USER } from "./type"

export const user_details = (contents) => ({
    type: SET_CURRENT_USER,
    payload: {
        USER_ID: contents.id,
        USER_NAME: contents.name,
        USER_CURRENT_STATUS: true,
    },
})