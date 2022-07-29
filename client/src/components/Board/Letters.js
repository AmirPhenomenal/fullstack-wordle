import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./styles.css";
const Letters = ({ letterPos, attempVal }) => {
  const { board, boardColor, currAttempt } = useContext(AppContext);
  return (
    <div
      className={`letter ${
        boardColor[attempVal][letterPos] === 3 ? "defaultColor" : ""
      } ${boardColor[attempVal][letterPos] === 2 ? "correct" : ""} ${
        boardColor[attempVal][letterPos] === 1 ? "almost" : ""
      } ${boardColor[attempVal][letterPos] === 0 ? "error" : ""} ${
        currAttempt.attemptPos > attempVal ? "flip" : ""
      }
      ${
        currAttempt.letterPos === letterPos + 1 &&
        currAttempt.attemptPos === attempVal
          ? "typeEffect"
          : ""
      }`}
    >
      {board[attempVal][letterPos]}
    </div>
  );
};

export default Letters;
