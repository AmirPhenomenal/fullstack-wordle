import React, { useContext } from "react";
import { AppContext } from "../../App";

const Key = ({ keyText, bigKey }) => {
  const { selectDelete, selectEnter, selectLetter, userLetterList } =
    useContext(AppContext);

  const keyPress = () => {
    if (keyText === "ENTER") selectEnter();
    else if (keyText === "DELETE") selectDelete();
    else selectLetter(keyText);
  };
  return (
    <div
      className={`key ${bigKey === true ? "bigKey" : ""} ${
        userLetterList.ignoreList.includes(keyText.toLowerCase()) &&
        "disableKey"
      }`}
      onClick={keyPress}
    >
      {keyText}
    </div>
  );
};

export default Key;
