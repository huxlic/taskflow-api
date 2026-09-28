import express from "express";
import {loginUser} from "./auth.controller.js";
import {validate} from "../../common/middleware/validate.js";
import {loginSchema} from "./auth.dto.js";

const router = express.Router();

router.post("/auth/login", validate(loginSchema), loginUser)

export default router;