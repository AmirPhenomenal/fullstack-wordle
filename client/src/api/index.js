import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8569" });

export const getWord = () => API.post("/wordle/getWord");
export const checkWord = (wordData) => API.post("/wordle/checkWord", wordData);
