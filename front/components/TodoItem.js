import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  MinusCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { CHECKED_POST_REQUEST, REMOVE_POST_REQUEST } from "../reducers/post";

const TodoItem = ({ post, month }) => {
  const dispatch = useDispatch();
  const { checkDone } = useSelector((state) => state.post);

  const { content, date, checked, id } = post;

  const [end, setEnd] = useState(checked);

  const onClickDelete = useCallback(() => {
    if (!month) {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: id,
      });
    }
  }, []);
  const style = {
    backgroundColor: "#f0f0f0",
    color: "#595959",
  };

  const style2 = {
    backgroundColor: "#2f54eb",
    color: "white",
  };

  const onToggle = useCallback(() => {
    if (!month) {
      setEnd((prev) => !prev);
      console.log(id, end);
      dispatch({
        type: CHECKED_POST_REQUEST,
        data: { checked: !checked, postId: id },
      });
    }
  }, [end, checked]);

  return (
    <div className="todoItemWrapper">
      {checked ? ( //false
        <CheckCircleOutlined
          style={{ color: "#2f54eb", fontSize: "16px" }}
          onClick={onToggle}
          disabled={month}
        />
      ) : (
        //true
        <MinusCircleOutlined
          style={{ color: "black", fontSize: "16px" }}
          onClick={onToggle}
          disabled={month}
        />
      )}
      <div className="textBox" style={checked ? style2 : style}>
        <div className="textBox__imo">😀</div>
        <div className="textBox__text">{content}</div>
        <div className="textBox__remove">
          <DeleteOutlined onClick={onClickDelete} disabled={month} />
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default TodoItem;
