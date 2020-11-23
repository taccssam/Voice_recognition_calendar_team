import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "../src/scss/styles.scss";
import Head from "next/head";
//import LoginForm from "../components/LoginForm";
import wrapper from "../store/configureStore";
//import { useSelector } from "react-redux";
import withReduxSaga from "next-redux-saga";
const ToDoApp = ({ Component }) => {
  //const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>TIkI&TAKA</title>
      </Head>
      <Component />
    </>
  );
};

ToDoApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(ToDoApp));
