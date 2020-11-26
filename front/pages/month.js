import React, { useState, useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import TodoItem from "../components/TodoItem";
import { Calendar, message } from "antd";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import Footer from "../components/Footer";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_DATE_POST_REQUEST } from "../reducers/post";
import Router from "next/router";
import wrapper from "../store/configureStore";

const MonthDiv = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`;

const TodosWrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  width: 100%;
`;

const month = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { monthTodos } = useSelector((state) => state.post);
  const [value, setValue] = useState(moment());

  const onPanelChange = useCallback((value) => {
    setValue(value);
  }, []);

  useEffect(() => {
    // if (!me) {
    //   message.error("로그인이 필요합니다");
    //   Router.replace("/user");
    // }
    dispatch({ type: LOAD_DATE_POST_REQUEST, data: value.format("YYYYMMDD") }); //달력 클릭하면 나오는 액션 만들기
  }, []);

  const onSelectDate = useCallback((value) => {
    setValue(value);
    dispatch({ type: LOAD_DATE_POST_REQUEST, data: value.format("YYYYMMDD") }); //달력 클릭하면 나오는 액션 만들기
  }, []);

  return (
    <AppLayout>
      <MonthDiv style={{ marginBottom: "15px" }}>
        <Calendar
          value={value}
          onSelect={onSelectDate}
          fullscreen={false}
          onPanelChange={onPanelChange}
        />
      </MonthDiv>
      <TodosWrapper className="todosWrapper">
        {monthTodos &&
          monthTodos.map((post) => (
            <TodoItem key={post.id} post={post} month={true} />
          ))}
      </TodosWrapper>
      <Footer />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default month;
