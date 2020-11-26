import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, DatePicker, Space, Checkbox } from "antd";
import moment from "moment";
//import Link from "next/link";
import styled from "styled-components";
//import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_GOAL_REQUEST, addGoal, dummyPost } from "../reducers/goal";

const SubmitWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
  background-color: white;
`;

const { RangePicker } = DatePicker;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const [goalTitle, setGoalTitle] = useState("");
  const [startLine, setStartLine] = useState("");
  const [endLine, setEndLine] = useState("");
  const [checkTotal, setCheckTotal] = useState("");
  const [everydayCount, setEverydayCount] = useState("");
  const [checked, setChecked] = useState(false);

  const toggleChecked = useCallback(() => {
    setChecked((prev) => !prev);
    console.log(checked);
    console.log(everydayCount);
    if (everydayCount) {
      setCheckTotal(everydayCount);
    }
  }, [checked]);

  const onChangeGoalDate = useCallback((dates, dateStrings) => {
    if (dates != null) {
      setEverydayCount(moment.duration(dates[1].diff(dates[0])).asDays());
      setStartLine(dates[0].format("YYYYMMDD"));
      setEndLine(dates[1].format("YYYYMMDD"));
    }
  });

  const onChangegoalTitle = useCallback((e) => {
    setGoalTitle(e.target.value);
  }, []);

  const onChangecheckTotal = useCallback((e) => {
    setCheckTotal(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (checked) {
      dispatch({
        type: ADD_GOAL_REQUEST,
        data: {
          goalTitle: goalTitle,
          startLine: startLine,
          endLine: endLine,
          checkTotal: parseInt(everydayCount),
        },
      });
    } else {
      dispatch({
        type: ADD_GOAL_REQUEST,
        data: {
          goalTitle: goalTitle,
          startLine: startLine,
          endLine: endLine,
          checkTotal: parseInt(checkTotal),
        },
      });
    }
    //setIsLoggedIn(true);
  }, [goalTitle, checkTotal, startLine, endLine, everydayCount]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <Space direction="vertical" size={12}>
        <label htmlFor="goal-date">날짜 설정:</label>
        <RangePicker
          htmlFor="goal-date"
          size="smail"
          onChange={onChangeGoalDate}
          disabledDate={disabledDate}
        />
        <div>
          <label htmlFor="goal-name">목표 이름:</label>
          <br />
          <Input
            name="goal-name"
            type="text"
            value={goalTitle}
            onChange={onChangegoalTitle}
            required
          />
        </div>
        <div>
          <label htmlFor="goal-count">횟수:</label>
          <br />
          <Input
            name="goal-count"
            type="number"
            value={checkTotal}
            onChange={onChangecheckTotal}
            required
            disabled={checked}
          />
          <Checkbox checked={checked} onChange={toggleChecked} />
          매일매일 할거에여
        </div>
      </Space>

      <SubmitWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          목표 설정
        </Button>
      </SubmitWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
