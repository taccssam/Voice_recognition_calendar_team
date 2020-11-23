import axios from "axios";
import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import {
  ADD_GOAL_REQUEST,
  ADD_GOAL_FAILURE,
  ADD_GOAL_SUCCESS,
  LOAD_GOAL_FAILURE,
  LOAD_GOAL_SUCCESS,
  LOAD_GOAL_REQUEST,
  GOAL_CHECK_FAILURE,
  GOAL_CHECK_REQUEST,
  GOAL_CHECK_SUCCESS,
} from "../reducers/goal";

function addGoalAPI(data) {
  //제너레이터 x
  // 실제 백엔드와 연결되는 부분
  return axios.post("/goal", data); //POST // /goal
}

function* addGoal(action) {
  try {
    const result = yield call(addGoalAPI, action.data);
    yield put({
      type: ADD_GOAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_GOAL_FAILURE,
      error: err.response.data,
    });
  }
}

function loadGoalAPI(data) {
  return axios.get("/goal/load", data);
}

function* loadGoal(action) {
  try {
    const result = yield call(loadGoalAPI, action.data);
    yield put({
      type: LOAD_GOAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_GOAL_FAILURE,
      error: err.response.data,
    });
  }
}

function goalCheckAPI(data) {
  return axios.post("/goal/check", { goalId: data });
}

function* goalCheck(action) {
  try {
    const result = yield call(goalCheckAPI, action.data);
    yield put({
      type: GOAL_CHECK_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: GOAL_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddGoal() {
  yield takeLatest(ADD_GOAL_REQUEST, addGoal);
}
function* watchLoadGoal() {
  yield takeLatest(LOAD_GOAL_REQUEST, loadGoal);
}

function* watchGoalCheck() {
  yield takeLatest(GOAL_CHECK_REQUEST, goalCheck);
}

export default function* goalSaga() {
  yield all([fork(watchAddGoal), fork(watchLoadGoal), fork(watchGoalCheck)]);
}
