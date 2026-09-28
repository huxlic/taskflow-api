import {db} from "../../infrastructure/database/connection.js";
import type {Task} from "./task.types.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";

export const findAll = async (): Promise<Task[]> => {
	const [rows] = await db.query<(RowDataPacket & Task)[]>("SELECT id, userId, title, description, completed, created_at, updated_at FROM tasks");
	return rows;
}

export const findOne = async (id: string): Promise<Task | undefined> => {
	const [row] = await db.query<(RowDataPacket & Task)[]>("SELECT id, userId, title, description, completed, created_at, updated_at FROM tasks WHERE id = ?", [id])
	return row[0];
}

export const create = async (input: Omit<Task, "completed" | "created_at" | "updated_at">): Promise<Task> => {
	const {id, userId, title} = input
	let description = input.description
	
	if (!description) {
		description = null;
	}
	
	const [result] = await db.query<ResultSetHeader>("INSERT INTO tasks (id, userId, title, description) VALUES (?, ?, ?, ?)", [id, userId, title, description]);
	if (result.affectedRows === 0) throw new Error("Insert failed")
	
	const task = await findOne(id)
	if (!task) throw new Error("Task not found after insert")
	
	return task;
}

export const findMine = async (userId: string): Promise<Task[]> => {
	const [rows] = await db.query<(RowDataPacket & Task)[]>("SELECT id, userId, title, description, completed, created_at, updated_at FROM tasks WHERE userId = ?", [userId])
	return rows;
}

export const findById = async (id: string, userId: string): Promise<Task | undefined> => {
	const [row] = await db.query<(RowDataPacket & Task)[]>("SELECT id, userId, title, description, completed, created_at, updated_at FROM tasks WHERE id = ? AND userId = ?", [id, userId])
	return row[0];
}

export const deleteOne = async (id: string, userId: string): Promise<boolean> => {
	const [result] = await db.query<ResultSetHeader>("DELETE FROM tasks WHERE id = ? AND userId = ?", [id, userId])
	
	return result.affectedRows === 1;
}