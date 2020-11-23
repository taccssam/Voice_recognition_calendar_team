import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostRequestAction,
  LOAD_POST_REQUEST,
  loadPostDone,
} from "../reducers/post";
import { setContext } from "redux-saga/effects";
import moment from "moment";
import wrapper from "../store/configureStore";

const TodoForm = () => {
  const { addPostDone, id, addPostError } = useSelector((state) => state.user);
  const [dos, setDos] = useState("");
  const [date, setDate] = useState(moment());
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setDos("");
    }
    if (addPostError) {
      alert(addPostError);
    }
  }, [addPostDone, addPostError]);

  const onChangeDo = useCallback((e) => {
    setDos(e.target.value);
  }, []);

  const onChangeDate = useCallback((date, dateString) => {
    const value = moment(dateString).format("YYYYMMDD");
    setDate(value);
  });
  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction({ content: dos, date: date, UserId: id }));
  }, [dos, date]);

  return (
    <Form onFinish={onSubmit}>
      <div>
        <label htmlFor="dos">TODO:</label>
        <br />
        <Input name="dos" value={dos} onChange={onChangeDo} required />
        <br />
        <label htmlFor="dos">DATE:</label>
        <br />
        <DatePicker onChange={onChangeDate} />
        <Button
          type="primary"
          style={{ backgroundColor: "2f54eb" }}
          htmlType="submit"
          loading={false}
        >
          확인
        </Button>
      </div>
    </Form>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     context.store.dispatch({
//       type: LOAD_POST_REQUEST,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

export default TodoForm;
