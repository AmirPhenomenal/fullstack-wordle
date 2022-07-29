import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./styles.css";
const GameOver = () => {
  const { winState } = useContext(AppContext);
  return (
    <div className="container">
      {winState.hasGuessed === true ? (
        <div>
          <h1 className="green">You Won The Game !</h1>
          <h2>Today Word Was {winState.word}</h2>
          <h2>Your Number Of Attempts {winState.attempts}</h2>
        </div>
      ) : (
        <div>
          <h1 className="red">You Have Failed . </h1>
        </div>
      )}
      <h4>The Word Will Update In : </h4>
    </div>
  );
};

export default GameOver;
