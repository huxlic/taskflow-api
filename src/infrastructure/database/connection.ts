import mysql from 'mysql2/promise';

export const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test',
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});
