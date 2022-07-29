export const SaveGameData = (
  boardData,
  boardColorData,
  attemptData,
  userLetterData
) => {
  localStorage.setItem("boardData", JSON.stringify(boardData));
  localStorage.setItem("boardColorData", JSON.stringify(boardColorData));
  localStorage.setItem("attemptData", JSON.stringify(attemptData));
  localStorage.setItem("userLetterData", JSON.stringify(userLetterData));
};

export const SaveWinStateData = (winStateData) => {
  localStorage.setItem("winState", JSON.stringify(winStateData));
};
