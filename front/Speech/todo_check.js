import { getToDoDate, getToDoText } from "./speechSplit";

import axios from "axios";
import { FIND_CHECK_REQUEST } from "../reducers/post";
//iscom =>
export const todoCheck = (te, iscom) => {
  let obj = getToDoDate(te);
  let TODOS_LS = obj[1]; //date
  let dt = obj[0];

  let text = getToDoText(te, dt); // 할일 text

  const data = {
    type: FIND_CHECK_REQUEST,
    data: {
      date: TODOS_LS,
      content: text,
    },
  };
  return data;

  //const result = axios.post('http://localhost:3065/post/check',data);

  // 여기서
  // const toDoObj = {
  //   type: CHECKED_POST_REQUEST,
  //   data: { checked: iscom },
  // };
  // return toDoObj;

  /*let loadedToDos = localStorage.getItem(TODOS_LS);
  let parsedToDos;

  if (loadedToDos !== null) {
    parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach((e) => {
      if (e.text == text) {
        e.complete = iscom;
      }
    });
  }
  console.log(parsedToDos);
  localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));*/
};
