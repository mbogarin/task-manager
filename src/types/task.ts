// = What does a task look like everywhere in my app?

export interface Task {
	id: number;
	title: string;
	completed: boolean;
	description?: string;
	priority?: Priority;
}

export type Priority = "low" | "medium" | "high" | "";
