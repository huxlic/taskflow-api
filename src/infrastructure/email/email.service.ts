import {transporter} from "./mailer.ts";

export const sendOtp = async (email: string, firstName: string, otp: string) => {
	try {
		const info = await transporter.sendMail({
			from: '"Hux Team" <oladimejihassan03@gmail.com>',
			to: email,
			subject: "Hello",
			html: `<b>Hello ${firstName}, Your OTP is ${otp}</b>`,
		});
	} catch (err) {
		throw err;
	}
}