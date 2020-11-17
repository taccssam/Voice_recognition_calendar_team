import moment from "moment";
import produce from "immer";

const today = moment();

export const initialState = {
  goals: null,
  addGoalLoading: false,
  addGoalDone: false,
  addGoalError: null,
  loadGoalLoading: false,
  loadGoalDone: false,
  loadGoalError: null,
};

export const ADD_GOAL_REQUEST = "ADD_GOAL_REQUEST";
export const ADD_GOAL_SUCCESS = "ADD_GOAL_SUCCESS";
export const ADD_GOAL_FAILURE = "ADD_GOAL_FAILURE";
export const LOAD_GOAL_REQUEST = "LOAD_GOAL_REQUEST";
export const LOAD_GOAL_SUCCESS = "LOAD_GOAL_SUCCESS";
export const LOAD_GOAL_FAILURE = "LOAD_GOAL_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_GOAL_REQUEST:
        draft.addGoalLoading = true;
        draft.addGoalDone = false;
        break;
      case ADD_GOAL_SUCCESS:
        draft.addGoalLoading = false;
        draft.addGoalDone = true;
        break;
      case ADD_GOAL_FAILURE:
        draft.addGoalLoading = false;
        draft.addGoalDone = false;
        draft.addGoalError = action.error;
        break;

      case LOAD_GOAL_REQUEST:
        draft.loadGoalLoading = true;
        draft.loadGoalDone = false;
        break;
      case LOAD_GOAL_SUCCESS:
        draft.loadGoalDone = true;
        draft.loadGoalLoading = false;
        draft.goals = action.data;
        break;
      case LOAD_GOAL_FAILURE:
        draft.loadGoalLoading = false;
        draft.loadGoalDone = false;
        draft.loadGoalError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;