import * as userService from "../user/user.service.js"
import {comparePassword} from "../../common/utils/hash.js";
import {AppError} from "../../common/errors/app-error.js";
import jwt from "jsonwebtoken"
import {config} from "../../config/index.js";
import {generateOtp} from "../../common/utils/generate-otp.ts";
import * as EmailService from "../../infrastructure/email/email.service.ts"

export const login = async (email: string, password: string) => {
	const user = await userService.getByEmail(email);
	if (!user) throw new AppError("Email does not exist", 404);
	if (!user.isVerified) throw new AppError("Email is not verified", 403);
	
	const valid = await comparePassword(password, user.password);
	if (!valid) throw new AppError("Invalid credentials", 400);
	
	return jwt.sign({id: user.id}, config.jwtSecret, {expiresIn: "1h"});
}

export const requestOtp = async (email: string | undefined) => {
	if (!email) throw new AppError("Email is required", 404);
	const user = await userService.getByEmail(email);
	if (!user) throw new AppError("Email does not exist", 404);
	
	const otp = generateOtp();
	try {
		await EmailService.sendOtp(user.email, user.firstName, otp);
		return otp;
	} catch (err) {
		throw new AppError("Failed to send OTP", 500);
	}
}