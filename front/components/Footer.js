import React, { useEffect, useState } from "react";
import { initMic } from "../Speech/micSet";
import { Modal } from "antd";
import Link from "next/link";
import {
  ADD_POST_REQUEST,
  FIND_POST_REQUEST,
  LOAD_DATE_POST_REQUEST,
  REMOVE_POST_REQUEST,
} from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSpeech } from "../Speech/speechAction";
import { ret, recognition, clearRet } from "../Speech/speechStart";
import { HomeOutlined, AudioOutlined, UserOutlined } from "@ant-design/icons";
import { SpeechText } from "../Speech/Text2Speech";

const Footer = () => {
  const dispatch = useDispatch();
  const { monthTodos, findItem } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(false);
  const [str, setStr] = useState("");

  const handleOk = () => {
    setVisible(false);
    const e = UpdateSpeech(ret);
    // console.log(UpdateSpeech(ret));
    dispatch(e);
    // 모든 today 읽어주기
    if (e.type === LOAD_DATE_POST_REQUEST) {
      console.log(monthTodos);
      let a = monthTodos.length;
      for (let i = 0; i < a; i++) {
        SpeechText(monthTodos[i].content);
      }
      SpeechText("일정이 있습니다.");
    }
    setStr("");
    clearRet();
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      recognition.stop();
    }
    setVisible(false);
    UpdateSpeech(null);
    setStr("");
    clearRet();
  };

  const showModal = () => {
    setVisible(true);
    initMic();
  };

  if (typeof window !== "undefined") {
    recognition.onend = () => {
      setStr(ret);
    };
  }

  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-list__item">
          <Link href="/">
            <a>
              <HomeOutlined />
            </a>
          </Link>
        </li>
        <li
          className="footer-list__item"
          style={{ color: "#1890ff", zIndex: "8" }}
        >
          <Modal
            title="날짜 + 일정 + 기능 순서로 말해주세요"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <br />
            <div>{str}</div>
          </Modal>
          <AudioOutlined onClick={showModal} />

          {/* <Link href="/goal">
                  <a>
                    
                  </a>
                </Link> */}
        </li>
        <li className="footer-list__item">
          <Link href="/user">
            <a>
              <UserOutlined />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
