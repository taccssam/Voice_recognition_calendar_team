export let ret = "";
export let recognition;

if (typeof window !== "undefined") {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "ko-KR";
  recognition.continuous = false;

  recognition.onresult = function (e) {
    let texts = Array.from(e.results)
      .map((results) => results[0].transcript)
      .join("");

    texts.replace(/느낌표|강조|뿅/gi, "❗️");
    console.log(ret);
    ret = texts;
  };
}

export const clearRet = () => {
  ret = "";
};
