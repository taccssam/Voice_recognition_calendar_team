import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import Router from "next/router";
import { END } from "redux-saga";
//import LoginForm from "../components/LoginForm";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";
import wrapper from "../store/configureStore";

const TodosWrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  width: 100%;
`;

const Todo = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { me } = useSelector((state) => state.user);
  const {
    todos,
    addPostLoading,
    loadPostDone,
    addPostDone,
    checkDone,
  } = useSelector((state) => state.post);
  console.log(todos);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, [loadPostDone, addPostDone]);

  return (
    <AppLayout>
      <div style={{ marginBottom: "20px" }}>
        <TodoForm />
      </div>
      <TodosWrapper className="todosWrapper">
        {todos &&
          todos.map((post) => (
            <TodoItem key={post.id} post={post} month={false} />
          ))}
      </TodosWrapper>
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
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Todo;
