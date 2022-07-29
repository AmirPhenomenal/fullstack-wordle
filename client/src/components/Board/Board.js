import React, { useContext } from "react";
import { AppContext } from "../../App";
import Letters from "./Letters";
const Board = () => {
  const { board } = useContext(AppContext);
  return (
    <div className="board">
      {board.map((rowElement, rowIndex) => {
        return (
          <div className="row" key={`r${rowIndex}`}>
            {rowElement.map((letterElement, letterIndex) => {
              return (
                <Letters
                  attempVal={rowIndex}
                  letterPos={letterIndex}
                  key={`r${rowIndex}c${letterIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
