import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.js"
import connectDB from "../db.js";
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.router.js"
import aiRouter from "./routes/ai.route.js"

dotenv.config();
const port = process.env.PORT

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json())
app.use(cookieParser())

connectDB();
app.get("/", (req, res) => {
  res.send("hello world")
})
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/ai", aiRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`i am running this on ${port}. so check on browser `)
  })
}

export default app;


