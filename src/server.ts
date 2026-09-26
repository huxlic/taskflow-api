import app from "./app.ts";
import {config} from "./config/index.ts";
import {testConnection} from "./infrastructure/database/connection.ts";

const PORT = config.port;

const startServer = async () => {
	try {
		await testConnection();
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}`)
		})
	} catch (err) {
		console.error("Failed to start the server", err);
		process.exit(1)
	}
}

startServer()