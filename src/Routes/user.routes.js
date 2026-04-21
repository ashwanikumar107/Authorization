import Router from "express";
import {VerifyToken} from "../middlewares/verifyToken.js";
import authorizeRoles from "../middlewares/userMiddlerware.js";

const router = Router();

router.get("/admin", VerifyToken, 
    authorizeRoles("admin"),
    (req, res) => {
    res.send("Welcome admin");
})

router.get("/manager", VerifyToken,
    authorizeRoles("admin", "manager"),
    (req, res) => {
    res.send("Welcome manager");
})

router.get("/user", VerifyToken, 
    authorizeRoles("admin", "manager", "User"),
    (req, res) => {
    res.send("Welcome user");
})

export default router;