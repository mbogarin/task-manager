import { createContext } from "react";
import type { Task } from "../types/task";

export type TaskContextType = {
	tasks: Task[];
	addTask: (task: Omit<Task, "id" | "completed" | "clientId">) => void;
	updateTask: (task: Task) => void;
	deleteTask: (id: number) => void;
	toggleTask: (id: number) => void;
	getTaskById: (id: number) => Task | undefined;
};

export const TaskContext = createContext<TaskContextType | undefined>(
	undefined,
);
