import React, { useEffect, useState } from "react";
import { initMic } from "../Speech/micSet";
import { message, Modal } from "antd";
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
import Router from "next/router";
//카카오
import { synthesize, recognize } from "../KAKAO/kakao_rest";

const Footer = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { todos, monthTodos, findItem } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(false);
  const [str, setStr] = useState("");

  const handleOk = async () => {
    setVisible(false);
    const e = UpdateSpeech(ret);
    // console.log(UpdateSpeech(ret));
    await dispatch(e);
    // 모든 today 읽어주기
    if (e.type === LOAD_DATE_POST_REQUEST) {
      if (todos !== null && monthTodos === null) {
        let a = todos.length;
        for (let i = 0; i < a; i++) {
          SpeechText(todos[i].content);
        }
        SpeechText("일정이 있습니다.");
      } else if (todos === null && monthTodos !== null) {
        let a = monthTodos.length;
        for (let i = 0; i < a; i++) {
          SpeechText(monthTodos[i].content);
        }
        SpeechText("일정이 있습니다.");
      } else {
        SpeechText("일정이 없습니다.");
      }
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
    if (!me) {
      message.error("로그인이 필요합니다.");
      Router.replace("/user");
    } else {
      setVisible(true);
      initMic();
    }
  };

  if (typeof window !== "undefined") {
    recognition.onend = () => {
      setStr(ret);
    };
  }

  const test = () => {
    let  k  =  synthesize('<speak> 안녕하세요. 반가워요. </speak>');
    console.log(k);
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
        <li className="footer-list__item">

          <HomeOutlined onClick={test}/>
            
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
            okText="확인"
            cancelText="다시 입력"
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
