const initialState ={
    set:[]
}
export const set_reducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_STORE":
            // return action.payload
            return {
                set : action.payload.contents
            }
        case "ADD_BOOK":
            console.log(action)
            // return [...state,action.payload]
            return {
                set:[...state.set,action.payload.contents]
            }
        case "MODIFY_BOOK":
            let data =[...state]
            let index = data.findIndex(element => element._id  === action.payload._id)
            if(index > -1){
                data[index] = action.payload
                return data
            }
            else return state
        case "ADD_BOOK_COMMIT":
            return state
        case "ADD_BOOK_ROLLBACK":
            return state    
        default:
            return state    
    }
}
