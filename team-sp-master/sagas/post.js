import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_DATE_POST_FAILURE,
  LOAD_DATE_POST_REQUEST,
  LOAD_DATE_POST_SUCCESS,
} from "../reducers/post";

import { ADD_POST_TO_ME } from "../reducers/user";

function addPostAPI(data) {
  //제너레이터 x
  // 실제 백엔드와 연결되는 부분
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  //제너레이터 x
  // 실제 백엔드와 연결되는 부분
  return axios.get("/posts", data);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function datePostAPI(data) {
  //제너레이터 x
  // 실제 백엔드와 연결되는 부분
  return axios.post("/posts", { month: data });
}

function* datePost(action) {
  try {
    const result = yield call(datePostAPI, action.data);
    yield put({
      type: LOAD_DATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_DATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchDatePost() {
  yield takeLatest(LOAD_DATE_POST_REQUEST, datePost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadPost), fork(watchDatePost)]);
}
