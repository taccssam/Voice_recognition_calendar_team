import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";
import goalSaga from "./goal";

// all input(배열) - > 배열안에 모든 것을 실행
// fork fork는 함수를 실행 동기 함수 호출
// call 함수를 실행 비동기 함수 호출 (await)
// put ==dispatch랑 같은 기능

//takeEvery  -> while(true) 를 대체 take는 한번만 실행! (최초실행후 제너레이터 동작 X)
// takeLatest -> 마지막의 수행되는 제너레이터만 실행한다(실수로 2~3번 눌렀을 때) (이미 완료된 것은 제외, 동시에 로딩중인것만 앞에 것을 취소)

axios.defaults.baseURL = "http://localhost:3065";

axios.defaults.withCredentials = true; // COOKIE 허용하겠다

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(goalSaga)]);
}
