let todayWord = {
  word: "hello",
  modifiedDate: 1,
};

export const setTodayWord = (word) => {
  todayWord.word = word;
  todayWord.modifiedDate = Date.now() / 1000;
};
export const getTodayWord = () => {
  return todayWord;
};
