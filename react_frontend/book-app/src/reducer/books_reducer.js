// const initialState = {
//     book:"",
//     author:"",
//     dateAdded:null
// }
const book_reducer = (state = null, action) => {
    switch(action.type){
        case "VIEW_BOOK":
            // state.book = action.payload.title
            // state.author = action.payload.author
            // state.dateAdded = action.payload.date_added
            console.log(action.payload)
            state = action.payload
            return state
        default:
            console.log("Default",action.payload)
            return state    
    }
}
export default book_reducer;