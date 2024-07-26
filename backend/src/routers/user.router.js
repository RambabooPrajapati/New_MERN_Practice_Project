
import express from "express";
import { changeCurrentPassword, deleteUser, getAllUsers, getUserProfile, login, logout, register, updateProfile } from "../constrollers/user.controller.js";
import tokenVerify from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout",tokenVerify, logout);
router.get("/get-user-profile", tokenVerify, getUserProfile);
router.get("/getAllUsers", tokenVerify, getAllUsers);
router.put("/update-profile", tokenVerify, updateProfile);
router.put("/changecurrent-password", tokenVerify, changeCurrentPassword);
router.delete("/delete", tokenVerify, deleteUser);

export default router;