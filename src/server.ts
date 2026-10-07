import app from "./app.js";
import {config} from "./config/index.js";
import {testConnection} from "./infrastructure/database/connection.js";
import {transporter} from "./infrastructure/email/mailer.ts";
import {prisma} from "./infrastructure/database/prisma.ts";

const PORT = config.port;

const startServer = async () => {
	try {
		await testConnection();
		await transporter.verify();
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}`)
		})
	} catch (err) {
		console.error("Failed to start the server", err);
		process.exit(1)
	}
}

startServer()
