export const SpeechText = (txt) => {
    

    if(!speechSynthesis) {
    alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
        return;
    }

    
let lang = 'ko-KR';
const say = new SpeechSynthesisUtterance(txt);
const voices = speechSynthesis.getVoices();


say.voice = voices[0];    
say.lang = lang;
say.pitch = 2;
say.rate = 1.5; 
speechSynthesis.speak(say);
}
