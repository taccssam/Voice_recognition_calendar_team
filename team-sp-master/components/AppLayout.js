import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Col, Row } from "antd";
import { HomeOutlined, AudioOutlined, HeartOutlined } from "@ant-design/icons";
import LoginForm from "./LoginForm";
import Today from "./Today";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Row>
        <Col xs={24} md={6}></Col>{" "}
        <Col style={{ minHeight: "667px" }} xs={24} md={12}>
          {" "}
          <Today />
          {me ? <UserProfile /> : <LoginForm />}
          <div>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link href="/">
                  <a>Today</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/month">
                  <a>Month</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/goal">
                  <a>Goal</a>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="pageWrapper">{children}</div>
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
                <Link href="/goal">
                  <a>
                    <AudioOutlined />
                  </a>
                </Link>
              </li>
              <li className="footer-list__item">
                <Link href="/signup">
                  <a>
                    <HeartOutlined />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
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
