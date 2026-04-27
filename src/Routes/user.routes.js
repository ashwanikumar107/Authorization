import Router from "express";
import { IsLoggedIn } from "../middlewares/IsLoggedIn.js";
import authorizeRoles from "../middlewares/userMiddlerware.js";

const router = Router();

router.get("/admin", IsLoggedIn, 
    authorizeRoles("admin"),
    (req, res) => {
    res.send("Welcome admin");
})

router.get("/manager", IsLoggedIn,
    authorizeRoles("admin", "manager"),
    (req, res) => {
    res.send("Welcome manager");
})

router.get("/user", IsLoggedIn, 
    authorizeRoles("admin", "manager", "User"),
    (req, res) => {
    res.send("Welcome user");
})

export default router;