const boardColorData = localStorage.getItem("boardColorData");
export const BoardColorDefault =
  boardColorData && boardColorData !== ""
    ? JSON.parse(boardColorData)
    : [
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
      ];
