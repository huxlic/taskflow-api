import express from "express";
import {getUsers} from "./user.controller.ts";

const router = express.Router();

router.post("/register")
router.get("/users", getUsers)
router.get("/users/:id", getUsers)

export default router;