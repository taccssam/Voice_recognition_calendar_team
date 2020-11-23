import { getToDoDate, getToDoText } from "./speechSplit";
import { ADD_POST_REQUEST } from "../reducers/post";
export const todoIns = (te) => {
  let obj = getToDoDate(te);
  let TODOS_LS = obj[1];
  let dt = obj[0];
  console.log(obj);
  let text = getToDoText(te, dt);

  //   let loadToDo = [],newId;

  //   let loadedToDos = localStorage.getItem(TODOS_LS);
  //   if (loadedToDos !== null) {
  //     const parsedToDos = JSON.parse(loadedToDos);
  //     parsedToDos.forEach(function (toDo) {
  //       loadToDo.push(toDo);
  //     });
  //     newId = loadedToDos.length + 1;
  //   }
  //   if (loadedToDos == null) {
  //     newId = 1;
  // }

  const toDoObj = {
    type: ADD_POST_REQUEST,
    data: { content: text, date: TODOS_LS },
  };
  return toDoObj;
  // loadToDo.push(toDoObj);
  // localStorage.setItem(TODOS_LS, JSON.stringify(loadToDo));
};
