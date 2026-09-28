import type {NextFunction, Request, Response} from "express"
import {AppError} from "../errors/app-error.js";
import jwt from "jsonwebtoken";
import {config} from "../../config/index.js";

export const authGuard = (req: Request, _res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) throw new AppError("No token provided", 400)
	
	const token = authHeader.split(" ")[1];
	if (!token) throw new AppError("No token provided", 400)
	
	try {
		const payload = jwt.verify(token, config.jwtSecret);
		if (!payload) throw new AppError("Invalid token", 401)
		if (typeof payload !== "object") throw new AppError("Invalid token", 401)
		if (!payload.id) throw new AppError("Invalid token", 401)
		
		const id = payload.id
		if (!id) throw new AppError("Invalid token", 401)
		
		req.user = {id: id}
		
		next()
	} catch (err) {
		throw new AppError("Session has expired", 401)
	}
}