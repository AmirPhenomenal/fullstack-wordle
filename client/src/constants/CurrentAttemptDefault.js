const attemptData = localStorage.getItem("attemptData");
export const CurrentAttempDefault =
  attemptData && attemptData !== ""
    ? JSON.parse(attemptData)
    : {
        attemptPos: 0,
        letterPos: 0,
      };
