
import express from "express";
import { login, register} from "../constrollers/auth.controller.js";
import { getUser, getAllUsers, updateUser, changeCurrentPassword, deleteUser, logout } from "../constrollers/user.controller.js";
import tokenVerify from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = express.Router();

// Auth routes
router.post("/signup", register);
router.post("/login", login);

//User routes
router.get("/get-user-profile/:id", tokenVerify, adminMiddleware(), getUser);
router.put("/update-user-info/:id", tokenVerify, adminMiddleware(),  updateUser);
router.delete("/delete/:id", tokenVerify, adminMiddleware(), deleteUser);
router.get("/getAllUsers", tokenVerify, adminMiddleware(), getAllUsers);
router.put("/changecurrent-password", tokenVerify, changeCurrentPassword);
router.post("/logout",tokenVerify, logout);

export default router;