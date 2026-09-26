import express, {type Express, type NextFunction, type Response, type Request} from "express"
import {errorHandler, notFoundHandler} from "./common/middleware/error-handler.ts";
import userRoutes from "./modules/user/user.routes.ts";

const app: Express = express()

app.use(express.json());

app.use(userRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app