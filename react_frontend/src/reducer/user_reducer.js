const initialState = {
    USER_CURRENT_STATUS : false,
    USER_NAME : "",
    USER_ID : null,
    USER_TOKEN: "",
    USER_PROFILE: "",
    USER_EMAIL: "",
}
const user_reducer = (state = initialState, action ) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            state.USER_ID = action.payload.contents.decode.id
            state.USER_NAME = action.payload.contents.decode.name
            state.USER_PROFILE = action.payload.contents.decode.profile
            state.USER_EMAIL = action.payload.contents.decode.email
            state.USER_CURRENT_STATUS = true
            state.USER_TOKEN = action.payload.contents.token
            return state
        case "SET_CURRENT_USER_LOGOUT":
            state.USER_ID = action.payload.USER_ID
            state.USER_NAME = action.payload.USER_NAME
            state.USER_CURRENT_STATUS = action.payload.USER_CURRENT_STATUS
            state.USER_TOKEN = action.payload.USER_TOKEN
            state.USER_PROFILE = ""
            state.USER_EMAIL = ""
            return state
        default:
            return state
    }
}
export default user_reducer;