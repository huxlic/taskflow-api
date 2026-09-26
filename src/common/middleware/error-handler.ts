import type {ErrorRequestHandler, Request, Response, NextFunction} from "express";
import {AppError} from "../errors/app-error.ts";

export const errorHandler: ErrorRequestHandler = (err: unknown, req, res, next) => {
	if (res.headersSent) return next(err)
	
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			status: "failed",
			message: err.message,
		})
	}
	
	res.status(500).json({
		status: "failed",
		message: "Something went wrong"
	})
}