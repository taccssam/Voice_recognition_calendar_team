import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import post from "./post";
import goal from "./goal";
import user from "./user";
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
        goal,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
