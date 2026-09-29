import express from "express";
import {createTask, deleteTask, getMyTasks, getSingleTask, getTasks} from "./task.controller.ts";
import {validate} from "../../common/middleware/validate.ts";
import {createTaskSchema} from "./task.dto.ts";
import {authGuard} from "../../common/middleware/auth-guard.ts";

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/me/tasks", authGuard, getMyTasks)
router.get("/me/tasks/:id", authGuard, getSingleTask)
router.delete("/me/tasks/:id", authGuard, deleteTask)
router.post("/me/create-task", authGuard, validate(createTaskSchema), createTask);

export default router;