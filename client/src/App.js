import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { checkWord, getWord } from "./actions/wordle";
import { showError, showSuccess } from "./messages";
import { BoardDefault } from "./constants/BoardDefault";
import { BoardColorDefault } from "./constants/BoardColorDefault";
import "./App.css";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { UserLetterDefault } from "./constants/UserLetterListDefault";
import { CurrentAttempDefault } from "./constants/CurrentAttemptDefault";
import { SaveGameData, SaveWinStateData } from "./GameData/SaveGameData";
import Countdown from "./components/Countdown/Countdown";
import { WinStateDefault } from "./constants/WinStateDefault";
import GameOver from "./components/GameOver/GameOver";
export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(BoardDefault);
  const [boardColor, setBoardColor] = useState(BoardColorDefault);
  const [currAttempt, setCurrAttempt] = useState(CurrentAttempDefault);
  const [userLetterList, setuserLetterList] = useState(UserLetterDefault);
  const [winState, setWinState] = useState(WinStateDefault);
  const [showCountdown, setShowCountdown] = useState(false);
  const selectLetter = (keyText) => {
    if (userLetterList.ignoreList.includes(keyText.toLowerCase())) return;
    if (currAttempt.letterPos === 5) return;
    const newBoard = [...board];
    newBoard[currAttempt.attemptPos][currAttempt.letterPos] =
      keyText.toLowerCase();
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };
  const selectEnter = async () => {
    if (currAttempt.letterPos < 5) return showError("Word Is Not 5 Letter");
    const userWord = board[currAttempt.attemptPos].join("");
    const wordArr = await checkWord(userWord);

    const newBoardColor = [...boardColor];
    newBoardColor[currAttempt.attemptPos] = wordArr.result;
    setBoardColor(newBoardColor);
    const newUserLetterList = { ...userLetterList };

    board[currAttempt.attemptPos].forEach((letter, index) => {
      if (userLetterList.acceptList.includes(letter)) return;
      if (userLetterList.ignoreList.includes(letter)) return;
      if (wordArr.result[index] === 1 || wordArr.result[index] === 2) {
        newUserLetterList.acceptList.push(letter);
      } else if (wordArr.result[index] === 0) {
        newUserLetterList.ignoreList.push(letter);
      }
    });
    setuserLetterList(newUserLetterList);
    if (wordArr.result.join("") === "22222") {
      const winStateData = {
        isGameOver: true,
        hasGuessed: true,
        attempts: currAttempt.attemptPos + 1,
        word: userWord,
      };
      setWinState(winStateData);
      SaveWinStateData(winStateData);
    } else if (currAttempt.attemptPos === 5) {
      const winStateData = {
        isGameOver: true,
        hasGuessed: false,
      };
      setWinState(winStateData);
      SaveWinStateData(winStateData);
    }
    const newCurrAttempt = {
      attemptPos: currAttempt.attemptPos + 1,
      letterPos: 0,
    };
    setCurrAttempt(newCurrAttempt);
    SaveGameData(board, newBoardColor, newCurrAttempt, newUserLetterList);
  };
  const selectDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attemptPos][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const getData = async () => {
    await getWord();
    setShowCountdown(true);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <button onClick={btnClick} type={"button"} />
        {word} */}
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          selectDelete,
          selectEnter,
          selectLetter,
          boardColor,
          userLetterList,
          winState,
        }}
      >
        <div className="game">
          {winState.isGameOver === true ? (
            <GameOver />
          ) : (
            <>
              <Board />
              <Keyboard />
            </>
          )}
          {showCountdown && (
            <Countdown
              targetDate={Math.floor(
                JSON.parse(localStorage.getItem("gameWord")).wordDate * 1000 +
                  240 * 1000
              )}
            />
          )}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
