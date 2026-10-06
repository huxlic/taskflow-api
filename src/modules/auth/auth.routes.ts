import express from "express";
import {loginUser, requestOtp} from "./auth.controller.js";
import {validate} from "../../common/middleware/validate.js";
import {loginSchema} from "./auth.dto.js";
import {authGuard} from "../../common/middleware/auth-guard.ts";

const router = express.Router();

router.post("/auth/login", validate(loginSchema), loginUser)
router.post("/auth/request-otp", authGuard, requestOtp)

export default router;