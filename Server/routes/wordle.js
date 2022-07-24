import express from "express";
import { checkWord, getWord } from "../controllers/words.js";

const router = express.Router();
router.post("/checkWord", checkWord);
router.post("/getWord", getWord);

export default router;
