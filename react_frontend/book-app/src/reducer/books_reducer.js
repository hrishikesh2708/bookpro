const initialState ={
    set:[],
    recently_added:[{author: "Adele Beahan",
    date_added: "2021-04-30T12:02:36.424Z",
    title: "ONE.' 'One.",
    __v: 0,
    _id: "608bf1dc89422c3ed8e8a683"}]
}
export const set_reducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_STORE":
            // return action.payload
            return {
                ...state,
                set : action.payload.contents,
            }
        case "ADD_BOOK":
            console.log(action)
            // return [...state,action.payload]
            return {
                set:[...state.set,action.payload.contents],
                recently_added : [action.payload.contents]
            }
        case "MODIFY_BOOK":
            let data =[...state.set]
            let index = data.findIndex(element => element._id  === action.payload.contents._id)
            if(index > -1){
                data[index] = action.payload.contents
                console.log(data[index])
                return {
                    set:data,
                    recently_added : [...state.recently_added]
                }
            }
            else
             return {
                 set:data
             }
        case "ADD_BOOK_COMMIT":
            return state
        case "ADD_BOOK_ROLLBACK":
            return state    
        default:
            return state    
    }
}
