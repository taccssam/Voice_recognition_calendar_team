import React, { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { GOAL_CHECK_REQUEST } from "../reducers/goal";
//import styled from "styled-components";

const SuccessButton = ({ props }) => {
  // 성공했을 때 성공한 check 갯수 줄여주는 액션
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const confirm = (e) => {
    message.success("Click on Yes");
    setSuccess(true);
    console.log(props);
    dispatch({
      type: GOAL_CHECK_REQUEST,
      data: props,
    });
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <div>
      <Popconfirm
        title="목표를 달성하셨나요?? (수정불가)"
        style={{ color: "red" }}
        onConfirm={confirm}
        onCancel={cancel}
        cancelText="아니여"
        okText="네"
        disabled={success}
      >
        <Button type="primary" disabled={success}>
          {" "}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default SuccessButton;
