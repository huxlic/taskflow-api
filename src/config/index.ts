import {env} from "./config.js";

export const config = {
	port: env.PORT,
	db: {
		host: env.DB_HOST,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		name: env.DB_NAME
	},
	smtp: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
		from: env.SMTP_FROM,
	},
	jwtSecret: env.JWT_SECRET,
	database: {
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		name: env.DATABASE_NAME,
		host: env.DATABASE_HOST,
		port: env.DATABASE_PORT
	}
}