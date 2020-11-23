import { recognition } from "./speechStart";

const MIC = `mic`;

export const ret = "";

export const saveMic = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

export const initMic = () => {
  const loadedMIC = localStorage.getItem(MIC);
  if (loadedMIC !== "prompt") {
    navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        // granted, denied, prompt
        localStorage.setItem(MIC, permissionStatus.state);
        permissionStatus.granted = function () {
          localStorage.setItem(MIC, permissionStatus.state);
        };
      });
  }
  recognition.start();
};
