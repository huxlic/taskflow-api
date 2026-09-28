import z from "zod";

export const createTaskSchema = z.object({
	title: z.string().min(1).max(255, {message: 'Title cannot be longer than 255'}),
	description: z.string().min(1).nullable().optional()
})