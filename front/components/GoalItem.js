import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import SuccessButton from "./SuccessButton";
import DoneButton from "./DoneButton";
import styled, { createGlobalStyle } from "styled-components";

const { Panel } = Collapse;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 3fr);
  grid-template-rows: repeat(12, 5fr);
  grid-gap: 3px;
`;

const Global = createGlobalStyle`
.ant-collapse-header{
  font-size:16px;
}
`;

const GoalItem = ({ goal }) => {
  const { goalTitle, checkTotal, checkDone, id, startLine, endLine } = goal;
  console.log(goalTitle, checkTotal, id, startLine, endLine);
  // const Icon = () => {
  //   return "👉";
  // };
  return (
    <div>
      <Global />
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header={goalTitle} key={id}>
          <div>시작일:{startLine}</div>
          <div>끝나는일:{endLine}</div>
          <GridDiv>
            {checkDone !== 0 &&
              [...Array(checkDone)].map((i) => (
                <DoneButton key={i} props={id} />
              ))}
            {checkTotal - checkDone > 0 &&
              [...Array(checkTotal - checkDone)].map((i) => (
                <SuccessButton key={i} props={id} />
              ))}
          </GridDiv>
        </Panel>
      </Collapse>
    </div>
  );
};

GoalItem.propTypes = {
  goal: PropTypes.object.isRequired,
};

export default GoalItem;
