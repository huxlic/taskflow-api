import express from "express";
import {createUser, getSingleUser, getUsers} from "./user.controller.js";
import {validate} from "../../common/middleware/validate.js";
import {createUserSchema} from "./user.dto.js";
import {authGuard} from "../../common/middleware/auth-guard.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), createUser)
router.get("/users", getUsers)
router.get("/user/:id", authGuard, getSingleUser)

export default router;