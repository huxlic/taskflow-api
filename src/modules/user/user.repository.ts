import {db} from "../../infrastructure/database/connection.ts";
import type {User} from "./user.types.ts";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import {DuplicateEntryError} from "../../common/errors/duplicate-entry-error.ts";

export const findAll = async (): Promise<User[]> => {
	const [rows] = await db.query<(User & RowDataPacket)[]>("SELECT id, firstName, lastName, email, password, created_at, updated_at FROM users")
	return rows;
}

export const findById = async (id: string): Promise<User | undefined> => {
	const [rows] = await db.query<(User & RowDataPacket)[]>("SELECT id, firstName, lastName, email, password, created_at, updated_at FROM users WHERE id = ?", [id])
	return rows[0]
}

export const create = async (id: string, input: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> => {
	try {
		const {firstName, lastName, email, password} = input
		const [result] = await db.query<ResultSetHeader>("INSERT INTO users (id, firstName, lastName, email, password) values (?, ?, ?, ?, ?)", [id, firstName, lastName, email, password]);
		
		if (result.affectedRows === 0) throw new Error("Insert failed");
	} catch (err: any) {
		if (err.code === "ER_DUP_ENTRY") throw new DuplicateEntryError("Email already in use");
		throw err;
	}
	
	const user = await findById(id)
	if (!user) throw new Error("User not found after insert")
	
	return user;
}