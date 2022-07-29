import React from "react";
import "./styles.css";
const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className="countdown">
      <p className={isDanger ? "danger" : ""}>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
