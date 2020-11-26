//require("dotenv").config();

import axios from "axios";

const KAKAO_KEY = "7b08f2de8822b6ee1b328aaafa94d0f6";

export const Kakao = axios.create({
  baseURL: "https://kakaoi-newtone-openapi.kakao.com",
  headers: {
    Authorization: "KakaoAK {"+KAKAO_KEY+"}"
  }
});

export const recognize = params => {
  return Kakao.get("/v1/recognize", { params });
};

export const synthesize = params => {
  return Kakao.get("/v1/synthesize", { params });
};