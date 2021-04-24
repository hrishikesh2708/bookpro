
export const book_reducer = (state = [], action) => {
    switch(action.type){
        case "VIEW_BOOK":
            state = action.payload
            return state
        default:
            return state    
    }
}
export const set_reducer = (state = [], action) => {
    switch(action.type){
        case "SET_STORE":
            state = action.payload
            return state
        default:
            return state    
    }
}
// export default book_reducer;