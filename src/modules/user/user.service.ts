import * as userRepository from "./user.repository.js"
import {v4 as uuidv4} from "uuid";
import type {User} from "./user.types.js";
import {hashPassword} from "../../common/utils/hash.js";
import {DuplicateEntryError} from "../../common/errors/duplicate-entry-error.js";
import {AppError} from "../../common/errors/app-error.js";

export const create = async (input: Omit<User, "id" | "password" | "created_at" | "updated_at">, password: string) => {
	const id = uuidv4();
	const hashedPassword = await hashPassword(password);
	
	try {
		return await userRepository.create(id, {...input, password: hashedPassword})
	} catch (err) {
		if (err instanceof DuplicateEntryError) throw new AppError("Email already in use. Log in instead", 409);
		throw err;
	}
}

export const getAll = async () => {
	return await userRepository.findAll();
}

export const getById = async (id: string): Promise<User> => {
	if (!id) throw new AppError("User ID is required", 400);
	
	const user = await userRepository.findById(id);
	if (!user) throw new AppError("User does not exist", 404);
	
	return user;
}

export const getByEmail = async (email: string): Promise<User | undefined> => {
	return await userRepository.findByEmail(email);
}