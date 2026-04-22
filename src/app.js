import express from "express";
import connectDB from "./config/database.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import taskRouter from "./Routes/task.routes.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

export default app;