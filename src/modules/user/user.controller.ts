import type {NextFunction, Request, Response} from "express"
import * as userService from "./user.service.js"

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getAll()
		
		res.status(200).json({
			status: "success",
			message: "Users fetched successfully",
			data: users
		})
	} catch (err) {
		next(err)
	}
}