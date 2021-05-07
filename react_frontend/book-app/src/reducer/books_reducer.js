const initialState ={
    set:[],
    loading_status: true,
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
                // ...state,            
                set : action.payload.contents,
                loading_status: false,
                recently_added: state.recently_added
            }
        case "ADD_BOOK":
            // console.log(action)
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
             case "MODIFY_BOOK_COMMIT":
                 console.log("modify commit ", action.payload)
                 return state
                // let data =[...state.set]
                // let index = data.findIndex(element => element._id  === action.payload.contents._id)
                // if(index > -1){
                //     data[index] = action.payload.contents
                //     console.log(data[index])
                //     return {
                //         set:data,
                //         recently_added : [...state.recently_added]
                //     }
                // }
                // else
                //  return {
                //      set:data
                //  }
                case "MODIFY_BOOK_ROLLBACK":
                    console.log("modify rollback ", action.payload)
                    return state
                //    let d1 =[...state.set]
                //    let index = d1.findIndex(element => element._id  === action.payload.contents._id)
                //    if(index > -1){
                //        d1[index] = action.payload.contents
                //        console.log(d1[index])
                //        return {
                //            set:d1,
                //            recently_added : [...state.recently_added]
                //        }
                //    }
                //    else
                //     return {
                //         set:d1
                //     }                
    

        case "ADD_BOOK_COMMIT":
            console.log("commit: ",action.payload)
            let arr =[...state.set]
            let ind = arr.findIndex(element => element.title  === action.payload.title)
            if(ind > -1){
                arr[ind] = action.payload
                console.log("commit: ",arr[ind])
                return {
                    set:arr,
                    recently_added : [...state.recently_added]
                }
            }
            else
             return {
                 set:arr
             }
        case "ADD_BOOK_ROLLBACK":
            console.log("add book rollback")
            return state    
        default:
            return state    
    }
}
