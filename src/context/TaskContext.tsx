// Stores task-related data & allows components throughout app to share info without excessive prop drilling (Global State Management)

import { useState } from "react";
import type { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Auth0User } from "../types/auth";
import type { Task } from "../types/task";
import { TaskContext } from "./taskContextCore";

// ! Mock Task Data:
// const mockTasks: Task[] = [
// 	{
// 		id: 1,
// 		title: "Build React project",
// 		description: "Finish task manager app",
// 		completed: true,
// 		priority: "high",
// 		clientId: "demo-user",
// 	},
// 	{
// 		id: 2,
// 		title: "Study TypeScript",
// 		description: "Review interfaces & types",
// 		completed: false,
// 		priority: "low",
// 		clientId: "demo-user",
// 	},
// ];

export function TaskProvider({ children }: { children: ReactNode }) {
	// State Hooks:
	const { user } = useAuth0();
	const authUser = user as Auth0User | undefined;

	// ! For testing purposes - state using mock tasks
	// const [tasks, setTasks] = useState<Task[]>(mockTasks);

	// = State Management (TASK DATA):
	const [tasks, setTasks] = useState<Task[]>([]);

	// Task Operations:
	// 1, Create task:
	const addTask = (task: Omit<Task, "id" | "completed" | "clientId">) => {
		const newTask: Task = {
			id: Date.now(),
			completed: false,
			clientId: authUser?.sub,
			// clientId: authUser?.sub ?? "demo-user", // ! For testing purposes
			...task,
		};
		setTasks((prev) => [...prev, newTask]);
	};

	// 2. Update Task:
	const updateTask = (updatedTask: Task) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		);
	};

	// 3. Delete task:
	const deleteTask = (id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	// Completion Status:
	const toggleTask = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	const getTaskById = (id: number): Task | undefined => {
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
