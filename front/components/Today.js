import React from "react";
// import styled from "styled-components";

const today = new Date();

const todayString = (num) => {
  if (num === 1) return "Monday";
  else if (num === 2) return "Tuesday";
  else if (num === 3) return "Wednesday";
  else if (num === 4) return "Thursday";
  else if (num === 5) return "Friday";
  else if (num === 6) return "Saturday";
  else return "Sunday";
};

// const TitleDiv = styled.div`
//   width: 100%;
//   background-color: white;
//   margin: 15px;
// `;

// const TodaysDiv = styled.div`
//   font-size: 22px;
//   color: #595959;
//   font-weight: 600;
// `;

// const DateDiv = styled.div`
//   display: flex;
//   font-size: 21px;
//   color: #2f54eb;
//   font-weight: 600;
// `;

const Today = () => {
  return (
    <div style={{ width: "100%", backgroundColor: "white", padding: "15px" }}>
      <div
        style={{
          fontSize: "25px",
          color: "#595959",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Today&#39;s TiKi-TaKa
      </div>
      <div
        style={{
          display: "flex",
          fontSzie: "21px",
          color: "#2f54eb",
          fontWeight: "600",
        }}
      >
        <div style={{ marginRight: "8px" }}>{todayString(today.getDay())}</div>
        <div>{today.getDate()}</div>
      </div>
    </div>
  );
};

export default Today;
