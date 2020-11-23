import React, { useCallback, useEffect } from "react";
import { Router } from "next/router";
import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOutRequestAction } from "../reducers/user";
import { TODOS_REMOVER } from "../reducers/post";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logOutRequestAction());
    dispatch({
      type: TODOS_REMOVER,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <div className="user-profile" style={{ backgroundColor: "White" }}>
      <div className="user-profile__left">
        <Avatar style={{ backgroundColor: "#2F54EB" }}>
          {me && me.nickname[0]}
        </Avatar>
      </div>
      <div className="user-profile__right">
        <div className="user-profile__name">
          환영합니다! {me && me.nickname}님{" "}
        </div>
        <Button type="primary" onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
