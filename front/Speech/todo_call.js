import { getToDoDate } from "./speechSplit";
import { SpeechText } from "./Text2Speech";
import { LOAD_DATE_POST_REQUEST } from "../reducers/post";
export const todoCall = (te, iscom) => {
  let obj = getToDoDate(te);
  let TODOS_LS = obj[1];

  const data = {
    type: LOAD_DATE_POST_REQUEST,
    data: TODOS_LS,
  };

  return data;

  // let loadedToDos = localStorage.getItem(TODOS_LS);
  // let parsedToDos;

  // if (loadedToDos !== null) {
  //     parsedToDos = JSON.parse(loadedToDos);

  //     parsedToDos.forEach(e => {
  //         let s = e.text;

  //         SpeechText(s);
  //     });
  //     SpeechText("일정이 있습니다.");
  // }
};
