import * as userRepository from "./user.repository.ts"
import {v4 as uuidv4} from "uuid";
import type {User} from "./user.types.ts";
import {hashPassword} from "../../common/utils/hash.ts";

export const getAll = async () => {
	return await userRepository.findAll();
}

export const create = async (input: Omit<User, "id" | "created_at" | "updated_at">) => {
	const id = uuidv4();
	const hashedPassword = await hashPassword(input.password);
	
	return await userRepository.create(id, {...input, password: hashedPassword})
}