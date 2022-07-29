import * as api from "../api";
import { showError, showSuccess } from "../messages";

export const getWord = async () => {
  try {
    const { data } = await api.getWord();
    localStorage.setItem("gameWord", JSON.stringify(data));
    // showSuccess(data.word);
    return data;
  } catch (error) {
    showError(error.response.data.error);
  }
};

export const checkWord = async (word) => {
  try {
    const gameWord = JSON.parse(localStorage.getItem("gameWord")).word;
    const { data } = await api.checkWord({ userWord: word, gameWord });
    return data;
  } catch (error) {
    if (
      error.response.data.needReload &&
      error.response.data.needReload === true
    ) {
      window.location.reload();
      localStorage.clear();
    }
    showError(error.response.data.error);
  }
};
