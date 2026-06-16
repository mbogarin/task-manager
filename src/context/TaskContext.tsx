import { useState } from "react";
import type { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Auth0User } from "../types/auth";
import type { Task } from "../types/task";
import { TaskContext } from "./taskContextCore";

export function TaskProvider({ children }: { children: ReactNode }) {
	// [STATE HOOKS]:
	const { user } = useAuth0();
	const authUser = user as Auth0User | undefined;

	const [tasks, setTasks] = useState<Task[]>([]);

	// [CRUD FUNCTIONS]:
	// = Add Task:
	const addTask = (task: Omit<Task, "id" | "completed" | "clientId">) => {
		const newTask: Task = {
			id: Date.now(),
			completed: false,
			clientId: authUser?.sub ?? "demo-user",
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
