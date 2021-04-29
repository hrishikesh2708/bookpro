const initialState ={
    set:[]
}
export const set_reducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_STORE":
            // return action.payload
            return action.payload
        case "ADD_BOOK":
            console.log(action)
            return [...state,action.payload]
        case "MODIFY_BOOK":
            let data =[...state]
            let index = data.findIndex(element => element._id  === action.payload._id)
            if(index > -1){
                data[index] = action.payload
                return data
            }
            else return state
        default:
            return state    
    }
}
