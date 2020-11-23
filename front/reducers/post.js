import produce from "immer";

export const initialState = {
  todos: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  datePostLoading: false,
  datePostDone: false,
  datePostError: null,
  monthTodos: null,
  checkLoading: false,
  checkDone: false,
  checkError: null,
  findLoading: false,
  findDone: false,
  findError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  findCheckLoading: false,
  findCheckDone: false,
  findCheckError: null,
  findItem: null,
  checkItem: null,
  index: 0,
  checkTodos: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const TODOS_REMOVER = "TODOS_REMOVER";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_DATE_POST_REQUEST = "LOAD_DATE_POST_REQUEST";
export const LOAD_DATE_POST_SUCCESS = "LOAD_DATE_POST_SUCCESS";
export const LOAD_DATE_POST_FAILURE = "LOAD_DATE_POST_FAILURE";

export const FIND_POST_REQUEST = "FIND_POST_REQUEST";
export const FIND_POST_SUCCESS = "FIND_POST_SUCCESS";
export const FIND_POST_FAILURE = "FIND_POST_FAILURE";

export const CHECKED_POST_REQUEST = "CHECKED_POST_REQUEST";
export const CHECKED_POST_SUCCESS = "CHECKED_POST_SUCCESS";
export const CHECKED_POST_FAILURE = "CHECKED_POST_FAILURE";

export const FIND_CHECK_REQUEST = "FIND_CHECK_REQUEST";
export const FIND_CHECK_SUCCESS = "FIND_CHECK_SUCCESS";
export const FIND_CHECK_FAILURE = "FIND_CHECK_FAILURE";

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const checkedPostRequest = (id) => {
  return {
    type: CHECKED_POST,
    id,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FIND_CHECK_REQUEST:
        draft.findCheckLoading = true;
        draft.findCheckDone = false;
        break;
      case FIND_CHECK_SUCCESS:
        draft.findCheckLoading = false;
        draft.findCheckDone = true;
        draft.findCheckItem = action.data;
        break;
      case FIND_CHECK_FAILURE:
        draft.findCheckLoading = false;
        draft.findCheckError = action.error;
        break;
      case FIND_POST_REQUEST:
        draft.findLoading = true;
        draft.findDone = false;
        break;
      case FIND_POST_SUCCESS:
        draft.findLoading = false;
        draft.findDone = true;
        draft.findItem = action.data;
        break;
      case FIND_POST_FAILURE:
        draft.findLoading = false;
        draft.findError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.todos = draft.todos.filter((v) => v.id !== action.data.PostId);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case CHECKED_POST_REQUEST:
        draft.checkLoading = true;
        draft.datePostDone = false;
        break;
      case CHECKED_POST_SUCCESS:
        draft.checkLoading = false;
        draft.checkDone = true;
        draft.index = draft.todos.findIndex(
          (obj) => obj.id === action.data[0].id
        );
        draft.todos = draft.todos.filter((v, i) => v.id !== action.data[0].id);
        console.log(draft.index);
        draft.todos.splice(draft.index, 0, action.data[0]);
        break;
      case CHECKED_POST_FAILURE:
        draft.checkLoading = false;
        draft.checkError = action.error;
        break;
      case LOAD_DATE_POST_REQUEST:
        draft.datePostLoading = true;
        draft.datePostDone = false;
        draft.datePostError = null;
        break;
      case LOAD_DATE_POST_SUCCESS:
        draft.datePostLoading = false;
        draft.datePostDone = true;
        draft.monthTodos = action.data;
        break;
      case LOAD_DATE_POST_FAILURE:
        draft.datePostLoading = false;
        draft.datePostError = action.error;
        break;
      case TODOS_REMOVER:
        draft.todos = null;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadaddPostDone = true;
        draft.todos = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
