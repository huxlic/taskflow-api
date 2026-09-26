import mysql from 'mysql2/promise';
import {config} from "../../config/index.ts";

export const db = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.name,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});

export const testConnection = async () => {
	const conn = await db.getConnection();
	try {
		await conn.ping()
	} catch (err) {
		throw new Error(`Failed to connect to database: ${err}`);
	} finally {
		conn.release()
	}
}