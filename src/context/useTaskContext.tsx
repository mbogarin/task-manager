import { useContext } from "react";
import { TaskContext } from "./taskContextCore";

export function useTaskContext() {
	const context = useContext(TaskContext);
	if (!context)
		throw new Error("useTaskContext must be used within TaskProvider");
	return context;
}
