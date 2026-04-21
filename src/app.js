import express from "express";
import connectDB from "./config/database.js";
import authRouter from "./Routes/auth.routes.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/auth", authRouter);

export default app;