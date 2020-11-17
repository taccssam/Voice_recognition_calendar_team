import React, { useState } from "react";
import { Button, Popconfirm, message } from "antd";
//import styled from "styled-components";

const SuccessButton = () => {
  // 성공했을 때 성공한 check 갯수 줄여주는 액션

  const [success, setSuccess] = useState(false);

  const confirm = (e) => {
    message.success("Click on Yes");
    setSuccess(true);
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <div>
      <Popconfirm
        title="하루 6km 걷기 하셧나요?? (수정이 불가합니다!)"
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
