import {sendMail} from "./mailer.ts";
import path from "node:path";
import * as fs from "node:fs/promises";
import Handlebars from "handlebars";
import type {SendVerificationEmailInput} from "./email.types.ts";

export const sendVerificationEmail = async ({to, name, otp, expiresInMinutes}: SendVerificationEmailInput) => {
	const source = await fs.readFile(path.join(import.meta.dirname, './templates/verify-email.hbs'), "utf8");
	const template = Handlebars.compile(source);
	const html = template({name, otp, expiresInMinutes});
	
	await sendMail({to, subject: "Verify your email", html})
}