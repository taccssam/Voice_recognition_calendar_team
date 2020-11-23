import React, { useCallback, useState, useEffect } from "react";
import useInput from "../hooks/useInput";
import AppLayout from "../components/Applayout";
import HEAD from "next/head";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Checkbox, Button } from "antd";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";
import UserProfile from "../components/UserProfile";
const ErrorMessage = styled.div`
  color: red;
`;

const user = () => {
  const dispatch = useDispatch();
  const { signUpError, singUpLoading, signUpDone, me } = useSelector(
    (state) => state.user
  );

  // useEffect(() => {
  //   if (me && me.id) {
  //     Router.replace("/");
  //   }
  // }, [me && me.id]);

  // useEffect(() => {
  //   if (signUpDone) {
  //     Router.replace("/");
  //   }
  // }, [signUpDone]);

  // useEffect(() => {
  //   if (signUpError) {
  //     alert(signUpError);
  //   }
  // }, [signUpError]);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);
  return (
    <AppLayout>
      <HEAD>회원가입 | 노드버드</HEAD>
      {me ? <UserProfile /> : <LoginForm />}
    </AppLayout>
  );
};

export default user;
