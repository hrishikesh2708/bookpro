const initialState = {
    USER_CURRENT_STATUS : false,
    USER_NAME : "",
    USER_ID : null
}
const user_reducer = (state = initialState, action ) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            state.USER_ID = action.payload.USER_ID
            state.USER_NAME = action.payload.USER_NAME
            state.USER_CURRENT_STATUS = action.payload.USER_CURRENT_STATUS
            return state
        default:
            return state
    }
}
export default user_reducer;