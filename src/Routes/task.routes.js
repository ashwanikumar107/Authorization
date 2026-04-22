import Router from "express";
import { VerifyToken } from "../middlewares/verifyToken.js";
import * as taskController from "../Controllers/task.controllers.js";

const router = Router();

router.post("/create", VerifyToken,
    taskController.createTask);

router.get("/read/:id", VerifyToken,
    taskController.readTask);

router.post("/update/:id", VerifyToken,
    taskController.updateTask);

router.get("/delete/:id", VerifyToken,
    taskController.deleteTask);

export default router;