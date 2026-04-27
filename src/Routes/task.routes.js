import Router from "express";
import { IsLoggedIn } from "../middlewares/IsLoggedIn.js";
import { canEditListing } from "../middlewares/CanEditListing.js";
import * as taskController from "../Controllers/task.controllers.js";

const router = Router();

router.post("/create", IsLoggedIn,
    taskController.createTask);

router.get("/read/:id", IsLoggedIn, canEditListing,
    taskController.readTask);

router.post("/update/:id", IsLoggedIn, canEditListing,
    taskController.updateTask);

router.get("/delete/:id", IsLoggedIn, canEditListing,
    taskController.deleteTask);

export default router;