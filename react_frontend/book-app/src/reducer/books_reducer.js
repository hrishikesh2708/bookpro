const initialState = {
  set: [],
  loading_status: true,
  bookAdded:"",
  bookModified:"",
  bookTobeDeleted: "",

};
export const set_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_RESULT":
      return {
        ...state,
        search: action.payload.contents,
      };
    case "SET_STORE":
      // return action.payload
      return {
        ...state,
        set: action.payload.contents,
        loading_status: false,
      };

    case "ADD_BOOK":
      return {
        ...state,
        set: [...state.set, action.payload.contents],
        bookAdded: action.payload.contents
      };

    case "ADD_BOOK_COMMIT":
      console.log("commit: ", action.payload);
      let arr = [...state.set];
      let ind = arr.findIndex(
        (element) => element.title === action.payload.title
      );
      if (ind > -1) {
        arr[ind] = action.payload;
        console.log("commit: ", arr[ind]);
        return {
          ...state,
          set: arr,
        };
      } else
        return {
          ...state,
          set: arr,
        };

    case "ADD_BOOK_ROLLBACK":
      console.log("rollback: ", action.payload);
      let Arr = [...state.set];
      let loc = Arr.findIndex(
        (element) => element.title === state.bookAdded.title
      );
      console.log(loc,state.bookAdded.title)
      if (loc > -1) {
        Arr.splice(loc,1)
        return {
          ...state,
          set: Arr,
        };
      } else
        return {
          ...state,
          set: Arr,
        };

    case "MODIFY_BOOK":
      let data = [...state.set];
      let index = data.findIndex(
        (element) => element._id === action.payload.newData._id
      );
      console.log("mod data", action.payload.newData, index);
      if (index > -1) {
        data[index] = action.payload.newData;
        return {
          ...state,
          set: data,
          bookModified: action.payload.oldData,
          modifyEffectCall: true,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };
      } else
        return {
          ...state,
          set: data,
          modifyEffectCall: true,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };

    case "MODIFY_BOOK_COMMIT":
      console.log("modify commit ", action.payload);
      return {
        ...state,
        modifyEffectCall: false,
        modifyCommitCall: true,
        modifyRollBackCall: false,
      };

    case "MODIFY_BOOK_ROLLBACK":
      const modData = [...state.set];
      let modIndex = modData.findIndex(
        (element) => element._id === state.bookModified._id
      );
      console.log("modify rollback ", action.payload, modIndex ,state.bookModified);
      if (modIndex > -1) {
        modData[modIndex] = state.bookModified;
        return {
          ...state,
          set: modData,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: true,
        };
      } else
        return {
          ...state,
          set: modData,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: true,
        };

    case "DELETE_BOOK":
      console.log("DELETEBOOK", action.payload);
      return {
        ...state,
        bookTobeDeleted: action.payload.contents.book,
        deleteCommitCall: false,
        deleteEffectCall: true,
        deleteRollBackCall: false,
      };

    case "DELETE_BOOK_COMMIT":
      console.log("DELETEBOOK commit", action.payload);
      let del = [...state.set];
      let j = del.findIndex((element) => element._id === action.payload._id);
      del.splice(j, 1);
      return {
        ...state,
        set: del,
        deleteCommitCall: true,
        deleteEffectCall: false,
        deleteRollBackCall: false,
      };

    case "DELETE_BOOK_ROLLBACK":
      console.log("DELETEBOOK rollback", action.payload.response, state.bookTobeDeleted);
      return {
        ...state,
        set: [...state.set],
        deleteCommitCall: false,
        deleteEffectCall: false,
        deleteRollBackCall: true,
      };

    default:
      return state;
  }
};
