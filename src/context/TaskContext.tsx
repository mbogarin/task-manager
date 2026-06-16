import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";

type TaskContextType = {
	tasks: Task[];
	addTask: (task: Omit<Task, "id" | "completed" | "clientId">) => void;
	updateTask: (task: Task) => void;
	deleteTask: (id: number) => void;
	toggleTask: (id: number) => void;
	getTaskById: (id: number) => Task | undefined;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
	// [STATE HOOKS]:
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: 1,
			title: "Title #1",
			completed: false,
			description: "description...",
			priority: "high",
			clientId: "demo-user",
		},
		{
			id: 2,
			title: "Title #2",
			completed: false,
			description: "description...",
			priority: "low",
			clientId: "demo-user",
		},
	]);

	// [CRUD FUNCTIONS]:
	// = Create Task:
	const addTask = (task: Omit<Task, "id" | "completed" | "clientId">) => {
		const newTask: Task = {
			id: Date.now(),
			completed: false,
			clientId: "demo-user",
			...task,
		};
		setTasks((prev) => [...prev, newTask]);
	};

	// = Update Task:
	const updateTask = (updatedTask: Task) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		);
	};

	// = Delete Task:
	const deleteTask = (id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	// = Toggle Task Completion:
	const toggleTask = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	const getTaskById = (id: number) => {
		return tasks.find((task) => task.id === id);
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addTask,
				updateTask,
				deleteTask,
				toggleTask,
				getTaskById,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}

export function useTaskContext() {
	const context = useContext(TaskContext);
	if (!context)
		throw new Error("useTaskContext must be used within TaskProvider");
	return context;
}
