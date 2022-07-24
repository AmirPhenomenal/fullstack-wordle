import bcrypt from "bcrypt";
import { setTodayWord, getTodayWord } from "../actions/todayWord.js";
import messages from "../constants/messages.js";

export const checkWord = async (req, res) => {
  try {
    console.log(req.body);
    const { userWord, gameWord } = req.body;
    if (!gameWord)
      return res.status(400).json({
        error: messages.invalidRequest,
      });
    const todayWord = getTodayWord().word;
    if (!(await bcrypt.compare(todayWord, gameWord)))
      return res
        .status(400)
        .json({ error: messages.wordChanged, needReload: true });
    if (!userWord || typeof userWord == "undefined")
      return res.status(400).json({ error: messages.noWord });
    if (userWord.length != 5)
      return res.status(400).json({ error: messages.longWord });
    console.log(userWord);
    let result = [0, 0, 0, 0, 0];

    let editableTodayWord = getTodayWord().word;
    console.log("ed", editableTodayWord);
    if (userWord == todayWord)
      return res.status(200).json({ result: [2, 2, 2, 2, 2] });
    //Set Greens
    for (let i = 0; i < 5; i++) {
      if (todayWord[i] == userWord[i]) {
        result[i] = 2;
        editableTodayWord = editableTodayWord.replace(userWord[i], "");
      }
    }
    console.log("after ed : ", editableTodayWord);
    for (let i = 0; i < 5; i++) {
      if (result[i] == 2) continue;
      if (editableTodayWord.includes(userWord[i])) {
        result[i] = 1;
        editableTodayWord = editableTodayWord.replace(userWord[i], "");
      }
    }
    //   setTodayWord("amir");
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: messages.serverError });
  }
};
export const getWord = async (req, res) => {
  try {
    const todayWord = getTodayWord();
    console.log("gettingWord : ", todayWord.word);
    const hashWord = await bcrypt.hash(todayWord.word, 12);
    return res
      .status(200)
      .json({ ok: true, word: hashWord, wordDate: todayWord.modifiedDate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: messages.serverError });
  }
};
