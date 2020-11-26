import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
// import { initMic } from "../Speech/micSet";
import Link from "next/link";
import { Menu, Col, Row, Modal, message } from "antd";
import { HomeOutlined, AudioOutlined, HeartOutlined } from "@ant-design/icons";
import LoginForm from "./LoginForm";
import Today from "./Today";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import Footer from "../components/Footer";
import Router from "next/router";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  const onClickError = useCallback(() => {
    if (!me) {
      message.error("로그인이 필요합니다!");
      Router.replace("/user");
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <div>
      <Row>
        <Col xs={24} md={6}></Col>{" "}
        <Col style={{ minHeight: "667px" }} xs={24} md={12}>
          {" "}
          <Today />
          <div>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link href="/">
                  <a>Todo</a>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={onClickError}>
                <Link href={me ? "/month" : "/user"}>
                  <a>Month</a>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={onClickError}>
                <Link href={me ? "/goal" : "/user"}>
                  <a>Goal</a>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="pageWrapper">{children}</div>
          <Footer />
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
