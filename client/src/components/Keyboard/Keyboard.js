import React, { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { KeyboardLayout } from "../../constants/KeyboardLayout";
import Key from "./Key";

const Keyboard = () => {
  const { selectDelete, selectEnter, selectLetter } = useContext(AppContext);
  const handleKeyBoard = useCallback((event) => {
    if (event.key === "Enter") {
      selectEnter();
    } else if (event.key == "Backspace") {
      selectDelete();
    } else if (/\b[a-zA-Z]{1}\b/.test(event.key) && event.key.length === 1) {
      selectLetter(event.key);
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);

    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyBoard}>
      {KeyboardLayout.map((keyLine, keyLineIndex) => {
        return (
          <div className="keyboardLine" key={`kl${keyLineIndex}`}>
            {keyLine.split("-").map((keyText, keyIndex) => {
              return (
                <Key
                  keyText={keyText}
                  bigKey={keyText.length > 1 ? true : false}
                  key={`kl${keyLineIndex}ki${keyIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
