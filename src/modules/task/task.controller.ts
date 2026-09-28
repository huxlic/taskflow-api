import type {NextFunction, Request, Response} from "express"
import * as taskService from "./task.service.js"
import {AppError} from "../../common/errors/app-error.ts";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.user
		
		const userId = typeof payload === "object" ? payload.id : payload;
		
		const task = await taskService.create({...req.body, userId: userId})
		
		res.status(201).json({
			status: "success",
			message: "Task created",
			data: task
		})
	} catch (err) {
		next(err)
	}
}

export const getTasks = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await taskService.getAll();
		
		res.status(200).json({
			status: "success",
			message: "All tasks fetched",
			data: tasks
		})
		
	} catch (err) {
		next(err)
	}
}

export const getMyTasks = async (req: Request, res: Response, next: NextFunction) => {

	if (!req.user) throw new AppError("Invalid token", 404)
	
	const payload = req.user.id
	
	try {
		const tasks = await taskService.getMine(payload)
		
		res.status(200).json({
			status: "success",
			message: "Task fetched",
			data: tasks
		})
	} catch (err) {
		next(err)
	}
}

export const getSingleTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
	const id = req.params.id
	
	if (!req.user) throw new AppError("Invalid token", 404)
	
	const payload = req.user.id
	
	try {
		const task = await taskService.getById(id, payload);
		
		res.status(200).json({
			status: "success",
			message: "Task found",
			data: task
		})
	} catch (err) {
		next(err)
	}
}

export const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id
		
		if (!req.user) throw new AppError("Invalid token", 404)
		
		const payload = req.user.id
		
		await taskService.deleteOne(id, payload)
		
		res.status(200).json({
			status: "success",
			message: "Task deleted"
		})
		
	} catch (err) {
		next(err)
	}
}