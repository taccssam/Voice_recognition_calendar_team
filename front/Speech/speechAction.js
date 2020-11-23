//speech의 수행할 항목을 선정하는 update함수
import { todoCall } from "./todo_call";
import { todoCheck } from "./todo_check";
import { todoDel } from "./todo_del";
import { todoIns } from "./todo_ins";

export const UpdateSpeech = (te) => {
  if (te == null) return;
  te = te.split(" ");
  //insert
  if (
    te[te.length - 2] == "추가해" ||
    te[te.length - 3] == "추가" ||
    te[te.length - 2] == "등록해" ||
    te[te.length - 3] == "등록"
  ) {
    window.alert("일정이 등록되었습니다.");
    return todoIns(te);

    console.log("insert");
  }
  //delete
  if (
    te[te.length - 2] == "삭제해" ||
    te[te.length - 3] == "삭제" ||
    te[te.length - 2] == "지워"
  ) {
    window.alert("일정이 삭제되었습니다.");
    return todoDel(te);
    console.log("delete");
  }
  //(complete)
  if (
    te[te.length - 2] == "체크해" ||
    te[te.length - 2] == "완료해" ||
    te[te.length - 3] == "완료" ||
    te[te.length - 2] == "체크"
  ) {
    window.alert("일정을 완료하였습니다.");
    return todoCheck(te, true);
    console.log("iscom true");
  }
  //complete cancel
  if (te[te.length - 2] == "취소해" || te[te.length - 3] == "취소") {
    window.alert("일정을 미완료하였습니다.");
    return todoCheck(te, false);
    console.log("iscom cancel");
  }
  //read
  if (te[te.length - 2] == "알려" || te[te.length - 2] == "읽어") {
    window.alert("일정을 알려드리겠습니다.");
    return todoCall(te);
    console.log("todo call");
  }

  //clearTextContent();
  //init_todo();
};
