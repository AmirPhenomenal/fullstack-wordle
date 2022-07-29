const WinState = localStorage.getItem("winState");
export const WinStateDefault =
  WinState && WinState !== ""
    ? JSON.parse(WinState)
    : {
        isGameOver: false,
        hasGuessed: false,
        attempts: 0,
        word: "",
      };
