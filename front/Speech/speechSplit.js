
export const getToDoDate = (te) => {
    
    console.log(66);
    const today = new Date();
    
    let tdate = ["", "", ""];
    let dt;
    if (te[0][te[0].length - 1] == "년") {
      for (j = 0; j < 3; j++) {
        for (i = 0; i < te[j].length; i++) {
          if (te[j][i] - "0" <= 9 && te[j][i] - "0" >= 0) tdate[j] += te[j][i];
        }
      }
      dt = 3;
    } else if (te[0][te[0].length - 1] == "월") {
      tdate[0] = today.getFullYear();
      for (j = 1; j < 3; j++) {
        for (i = 0; i < te[j].length; i++) {
          if (te[j - 1][i] - "0" <= 9 && te[j - 1][i] - "0" >= 0)
            tdate[j] += te[j - 1][i];
        }
      }
      dt = 2;
    } else if (te[0][te[0].length - 1] == "일" && te[0] != "내일") {
      tdate[0] = today.getFullYear();
      tdate[1] = today.getMonth() + 1;
      for (j = 2; j < 3; j++) {
        for (i = 0; i < te[j].length; i++) {
          if (te[j - 2][i] - "0" <= 9 && te[j - 2][i] - "0" >= 0)
            tdate[j] += te[j - 2][i];
        }
      }
      dt = 1;
    } else if (te[0] == "어제") {
      
        tdate[0] = today.getFullYear();
        
      tdate[1] = today.getMonth() + 1;
      tdate[2] = today.getDate() -1;
    }
    else if (te[0] == "오늘") {
        console.log(111);
        tdate[0] = today.getFullYear();
        console.log(222);
      tdate[1] = today.getMonth() + 1;
      tdate[2] = today.getDate();
      dt = 1;
    } else if (te[0] == "내일") {
      tdate[0] = today.getFullYear();
      tdate[1] = today.getMonth() + 1;
        tdate[2] = today.getDate() + 1;
        
      dt = 1;
    } else if (te[0] == "모레") {
      tdate[0] = today.getFullYear();
      tdate[1] = today.getMonth() + 1;
      tdate[2] = today.getDate() + 2;
      dt = 1;
    } else {
      tdate[0] = today.getFullYear();
      tdate[1] = today.getMonth() + 1;
      tdate[2] = today.getDate();
      dt = 0;
    }
  
    let TODOS_LS = `${tdate[0]}${tdate[1]}${tdate[2]}`;
    console.log(TODOS_LS);
    let obj = [dt, TODOS_LS];
    return  obj ;
  }
  
export const getToDoText = (te, dt) => {
    let de;
    let text = "";
    
    console.log(te);
    if (te[te.length - 2].length > 1) {
      de = 2;
    } else de = 3;
  
    for (let i = dt; i < te.length - de; i++) {
      text += te[i];
      if (i != te.length - de - 1) text += " ";
      
    }

    console.log(text);

    if (text[text.length - 1] == "를" || text[text.length - 1] == "을") {
      text = text.substring(0, text.length - 1);
    }
    if (text.substring(text.length - 2, text.length) == "일정") {
      text = text.substring(0, text.length - 3);
    }

    console.log(text);
    return text;

  }
  