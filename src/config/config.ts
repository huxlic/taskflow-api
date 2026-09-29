import z from "zod";

const connectionSchema = z.object({
	PORT: z.coerce.number().default(3000),
	DB_HOST: z.string().min(1),
	DB_USER: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_NAME: z.string().min(1),
	JWT_SECRET: z.string().min(30)
})

export const env = connectionSchema.parse(process.env);
