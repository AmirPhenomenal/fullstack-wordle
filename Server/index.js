import express from "express";
import cors from "cors";
import wordleRoutes from "./routes/wordle.js";
import { dayWordUpdater } from "./actions/DayWordUpdater.js";
import messages from "./constants/messages.js";

const app = express();
app.use(express.json());
// app.use(cors);
app.use("/wordle", wordleRoutes);
app.use((err, req, res, next) => {
  if (err) {
    console.error("Server Error : ", err);
    return res.status(400).send({ error: messages.serverError }); // Bad request
  }
  next();
});
dayWordUpdater();

const PORT = process.env.PORT || 8569;
app.listen(PORT, () =>
  console.log("\x1b[36m%s\x1b[0m", `Server   Started On Port ${PORT}`)
);
