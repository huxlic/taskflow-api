import express, {type Express, type NextFunction, type Response, type Request} from "express"
import {errorHandler, notFoundHandler} from "./common/middleware/error-handler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import taskRoutes from "./modules/task/task.routes.ts"

const app: Express = express()

app.use(express.json());

app.use(authRoutes)
app.use(userRoutes)
app.use(taskRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app