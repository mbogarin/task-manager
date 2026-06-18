// Defines the structure of every task object.

// = Task interface:
export interface Task {
	id: number;
	title: string;
	completed: boolean;
	description?: string;
	priority?: Priority;
	clientId?: string;
}

// = Priority type:
export type Priority = "low" | "medium" | "high";
