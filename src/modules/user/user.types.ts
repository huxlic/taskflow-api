export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isVerified: boolean;
	created_at: string;
	updated_at: string;
}

export type PublicUser = Omit<User, "password">