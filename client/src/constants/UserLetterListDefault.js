const userLetterData = localStorage.getItem("userLetterData");
export const UserLetterDefault =
  userLetterData && userLetterData !== ""
    ? JSON.parse(userLetterData)
    : {
        ignoreList: [],
        acceptList: [],
      };
