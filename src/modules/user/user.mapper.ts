import type {PublicUser, User} from "./user.types.js";

export const toPublicUser = (user: User): PublicUser => {
	const {password, ...rest} = user;
	return rest;
}