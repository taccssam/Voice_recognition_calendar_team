import React, { useEffect } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import GoalItem from "../components/GoalItem";
import GoalForm from "../components/GoalForm";
import { useSelector, useDispatch } from "react-redux";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { Collapse } from "antd";
import { LOAD_GOAL_REQUEST } from "../reducers/goal";
import { END } from "redux-saga";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Goal = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { goals, loadGoalDone, addGoalDone, goalCheckDone } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    // if (!me) {
    //   message.error("로그인이 필요합니다");
    //   Router.replace("/user");
    // }
    dispatch({
      type: LOAD_GOAL_REQUEST,
    });
  }, [addGoalDone, loadGoalDone]);

  return (
    <AppLayout>
      <Collapse
        defaultActiveKey={["1"]}
        ghost
        expandIcon={({ isActive }) => (
          <PlusOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header={"추가"}>
          <GoalForm />
        </Panel>
      </Collapse>
      <div style={{ marginBottom: "15px" }}>
        {goals && goals.map((goal) => <GoalItem key={goal.id} goal={goal} />)}
      </div>
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
      type: LOAD_GOAL_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Goal;
