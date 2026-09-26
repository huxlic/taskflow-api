import express, {type Express, type NextFunction, type Response, type Request} from "express"
import {errorHandler, notFoundHandler} from "./common/middleware/error-handler.ts";

const app: Express = express()

app.use(express.json());

app.get("/health", (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json({
			status: "OK",
		})
	} catch (e) {
		next(e)
	}
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app