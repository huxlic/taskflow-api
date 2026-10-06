import type {NextFunction, Request, Response} from "express"
import * as authService from "./auth.service.js"

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {email, password} = req.body
		
		const token = await authService.login(email, password)
		
		res.header("Auth-token", token)
		res.status(200).json({
			status: "success",
			message: "Login Successful",
			data: {token},
		})
	} catch (err) {
		next(err)
	}
}

export const requestOtp = async (req: Request<{email: string}>, res: Response, next: NextFunction) => {
	try {
		const email = req.params.email;
		const otp = await authService.requestOtp(email)
		
		res.status(200).json({
			status: "success",
			message: "OTP sent successfully",
			data: {otp},
		})
	} catch (err) {
		next(err)
	}
}
