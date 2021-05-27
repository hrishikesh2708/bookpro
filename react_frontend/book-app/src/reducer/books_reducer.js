const initialState = {
  set: [],
  loading_status: true,
  bookAdded: "",
  bookModified: "",
  bookTobeDeleted: "",
  privateBooks: [],
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
        // addEffectCall: false,
        // addCommitCall: false,
        // addRollBackCall: false,
        // deleteCommitCall: false,
        // deleteEffectCall: false,
        // deleteRollBackCall: false,
        // modifyEffectCall: false,
        // modifyCommitCall: false,
        // modifyRollBackCall: false,
      };

    case "MY_BOOKS":
      // console.log("mybooks",action.payload)
      return {
        ...state,
        privateBooks: action.payload.contents,
      };

    case "ADD_BOOK":
      return {
        ...state,
        set: [...state.set, action.payload.contents.data],
        bookAdded: action.payload.contents.data,
        addEffectCall: true,
        addCommitCall: false,
        addRollBackCall: false,
        deleteCommitCall: false,
        deleteEffectCall: false,
        deleteRollBackCall: false,
        modifyEffectCall: false,
        modifyCommitCall: false,
        modifyRollBackCall: false,
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
          addEffectCall: false,
          addCommitCall: true,
          addRollBackCall: false,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };
      } else
        return {
          ...state,
          set: arr,
          addEffectCall: false,
          addCommitCall: true,
          addRollBackCall: false,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };

    case "ADD_BOOK_ROLLBACK":
      console.log("rollback: ", action.payload);
      let Arr = [...state.set];
      let loc = Arr.findIndex(
        (element) => element.title === state.bookAdded.title
      );
      console.log(loc, state.bookAdded.title);
      if (loc > -1) {
        Arr.splice(loc, 1);
        return {
          ...state,
          set: Arr,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: true,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };
      } else
        return {
          ...state,
          set: Arr,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: true,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: false,
        };

    case "ADD_BOOK_SSE_COMMIT":
      // console.log("sse addition" ,action.payload)
      let array = [...state.set];
      let location = array.findIndex(
        (element) => element.title === action.payload.title
      );
      console.log("sse addition", action.payload, location);
      if (location > -1) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          set: [...state.set, action.payload],
        };
      }

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
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: false,
        };
      } else
        return {
          ...state,
          set: data,
          modifyEffectCall: true,
          modifyCommitCall: false,
          modifyRollBackCall: false,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: false,
        };

    case "MODIFY_BOOK_COMMIT":
      console.log("modify commit ", action.payload);
      return {
        ...state,
        modifyEffectCall: false,
        modifyCommitCall: true,
        modifyRollBackCall: false,
        deleteCommitCall: false,
        deleteEffectCall: false,
        deleteRollBackCall: false,
        addEffectCall: false,
        addCommitCall: false,
        addRollBackCall: false,
      };

    case "MODIFY_BOOK_ROLLBACK":
      const modData = [...state.set];
      let modIndex = modData.findIndex(
        (element) => element._id === state.bookModified._id
      );
      console.log(
        "modify rollback ",
        action.payload,
        modIndex,
        state.bookModified
      );
      if (modIndex > -1) {
        modData[modIndex] = state.bookModified;
        return {
          ...state,
          set: modData,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: true,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: false,
        };
      } else
        return {
          ...state,
          set: modData,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: true,
          deleteCommitCall: false,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: false,
        };

    case "MODIFY_BOOK_SSE_COMMIT":
      let modsse = [...state.set];
      let modloc = modsse.findIndex(
        (element) => element._id === action.payload._id
      );
      console.log("modify sse commit", action.payload, modloc);
      if (modloc > -1 && modsse[modloc].author !== action.payload._author) {
        console.log("change in contents payload",action.payload,modsse[modloc])
        modsse[modloc].author = action.payload.author;
        return {
          ...state,
          set: modsse,
        };
      } else {
        return {
          ...state,
        };
      }

    case "DELETE_BOOK":
      console.log("DELETEBOOK", action.payload);
      return {
        ...state,
        bookTobeDeleted: action.payload.contents.book,
        deleteCommitCall: false,
        deleteEffectCall: true,
        deleteRollBackCall: false,
        modifyEffectCall: false,
        modifyCommitCall: false,
        modifyRollBackCall: false,
        addEffectCall: false,
        addCommitCall: false,
        addRollBackCall: false,
      };

    case "DELETE_BOOK_COMMIT":
      let del = [...state.set];
      let j = del.findIndex(
        (element) => element._id === state.bookTobeDeleted._id
      );
      console.log("DELETEBOOK commit", j, action.payload);
      if(j > -1){
        del.splice(j, 1);
        return {
          ...state,
          set: del,
          deleteCommitCall: true,
          deleteEffectCall: false,
          deleteRollBackCall: false,
          modifyEffectCall: false,
          modifyCommitCall: false,
          modifyRollBackCall: false,
          addEffectCall: false,
          addCommitCall: false,
          addRollBackCall: false,
        };
      }else{
        return {
          ...state,
        }
      }


    case "DELETE_BOOK_ROLLBACK":
      console.log(
        "DELETEBOOK rollback",
        action.payload.response,
        state.bookTobeDeleted
      );
      return {
        ...state,
        set: [...state.set],
        deleteCommitCall: false,
        deleteEffectCall: false,
        deleteRollBackCall: true,
        modifyEffectCall: false,
        modifyCommitCall: false,
        modifyRollBackCall: false,
        addEffectCall: false,
        addCommitCall: false,
        addRollBackCall: false,
      };

    case "DELETE_BOOK_SSE_COMMIT":
      let delSse = [...state.set];
      let delLoc = delSse.findIndex(
        (element) => element._id === action.payload._id
      );
      console.log("delete sse commit ", action.payload, delLoc);
      if (delLoc > -1) {
        delSse.splice(delLoc, 1);
        return {
          ...state,
          set: delSse,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};
