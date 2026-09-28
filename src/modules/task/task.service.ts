import type {Task} from "./task.types.js";
import {v4 as uuidv4} from "uuid";
import * as taskRepository from "./task.repository.js"
import * as userService from "../user/user.service.ts"
import {AppError} from "../../common/errors/app-error.ts";

export const create = async (input: Omit<Task, "id" | "completed" | "created_at" | "updated_at">): Promise<Task> => {
	try {
		await userService.getById(input.userId)
		
		const id = uuidv4();
		return await taskRepository.create({id: id, ...input})
		
	} catch (err) {
		throw err
	}
}

export const getAll = async (): Promise<Task[]> => {
	try {
		return await taskRepository.findAll()
		
	} catch (err) {
		throw err
	}
}

export const getMine = async (userId: string): Promise<Task[]> => {
	try {
		if (!userId) throw new AppError("User ID is required", 401)
		
		await userService.getById(userId);
		
		return await taskRepository.findMine(userId)
		
	} catch (err) {
		throw err
	}
}

export const getById = async (id: string, userId: string): Promise<Task> => {
	try {
		if (!id) throw new AppError("ID is required", 401)
		if (!userId) throw new AppError("User ID is required", 401)
		
		await userService.getById(userId)
		
		const task = await taskRepository.findById(id, userId)
		if (!task) throw new AppError("Task not found", 404)
		
		return task;
		
	} catch (err) {
		throw err
	}
}

export const deleteOne = async (id: string, userId: string): Promise<void> => {
	if (!id) throw new AppError("ID is required", 400)
	if (!userId) throw new AppError("User ID is required", 401)
	
	await userService.getById(userId)
	
	const isDeleted = await taskRepository.deleteOne(id, userId)
	if (!isDeleted) throw new AppError("Task not found", 404)
}