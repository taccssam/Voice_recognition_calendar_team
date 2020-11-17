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
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const TODOS_REMOVER = "TODOS_REMOVER";
const CHECKED_POST = "CHECKED_POST"; //보류

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_DATE_POST_REQUEST = "LOAD_DATE_POST_REQUEST";
export const LOAD_DATE_POST_SUCCESS = "LOAD_DATE_POST_SUCCESS";
export const LOAD_DATE_POST_FAILURE = "LOAD_DATE_POST_FAILURE";

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
