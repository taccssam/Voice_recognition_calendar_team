import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const TodoForm = () => {
  const [dos, setDos] = useState("");
  const dispatch = useDispatch();

  const onChangeDo = useCallback((e) => {
    setDos(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost(dos));
    setDos("");
  }, [dos]);

  return (
    <Form onFinish={onSubmit}>
      <div>
        <label htmlFor="dos">할 일</label>
        <br />
        <Input name="dos" value={dos} onChange={onChangeDo} required />
      </div>
      <div>
        <Button
          type="primary"
          style={{ backgroundColor: "2f54eb" }}
          htmlType="submit"
          loading={false}
        >
          추가
        </Button>
      </div>
    </Form>
  );
};

export default TodoForm;
