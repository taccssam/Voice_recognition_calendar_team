import React, { useCallback, useState, useSelector } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { MinusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const TodoItem = ({ post }) => {
  const { content, date } = post;
  const [end, setEnd] = useState(false);

  const style = {
    backgroundColor: "#f0f0f0",
    color: "#595959",
  };

  const style2 = {
    backgroundColor: "#2f54eb",
    color: "white",
  };

  const onToggle = useCallback(() => {
    setEnd((prev) => !prev);
  }, []);
  return (
    <div className="todoItemWrapper">
      {end ? (
        <CheckCircleOutlined
          style={{ color: "#2f54eb", fontSize: "16px" }}
          onClick={onToggle}
        />
      ) : (
        <MinusCircleOutlined
          style={{ color: "black", fontSize: "16px" }}
          onClick={onToggle}
        />
      )}
      <div className="textBox" style={end ? style2 : style}>
        <div className="textBox__imo">😀</div>
        <div className="textBox__text">{content}</div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default TodoItem;
