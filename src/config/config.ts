import z from "zod";

const connectionSchema = z.object({
	PORT: z.coerce.number().default(3000),
	DB_HOST: z.string().min(1),
	DB_USER: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_NAME: z.string().min(1),
	JWT_SECRET: z.string().min(30),
	SMTP_USER: z.email({message: "Invalid SMTP user email address"}),
	SMTP_PASS: z.string().min(1),
	SMTP_FROM: z.string().min(10),
	DATABASE_USER: z.string().min(1),
	DATABASE_PASSWORD: z.string().min(1),
	DATABASE_NAME: z.string().min(1),
	DATABASE_HOST: z.string().min(2),
	DATABASE_PORT: z.coerce.number().default(3306)
});

export const env = connectionSchema.parse(process.env);
