const boardData = localStorage.getItem("boardData");
export const BoardDefault =
  boardData && boardData !== ""
    ? JSON.parse(boardData)
    : [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ];
