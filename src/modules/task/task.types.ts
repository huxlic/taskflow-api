export type Task = {
	id: string;
	userId: string;
	title: string;
	description?: string | null;
	completed: boolean;
	created_at: string;
	updated_at: string;
}