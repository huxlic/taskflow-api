import nodemailer from "nodemailer";
import {config} from "../../config/index.ts";

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: config.smtp.user,
		pass: config.smtp.pass,
	},
});