import { useState, useEffect } from "react";
import type { Task } from "../types/task";

type CreateTask = {
	title: string;
	description?: string;
	priority?: "low" | "medium" | "high";
};

type TaskFormProps = {
	onAddTask: (task: CreateTask) => void;
	onUpdateTask?: (task: Task) => void;
	editingTask?: Task | null;
	setEditingTask: (task: Task | null) => void;
};

function TaskForm({
	onAddTask,
	onUpdateTask,
	editingTask,
	setEditingTask,
}: TaskFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<"low" | "medium" | "high" | "">(
		"",
	);

	// Sync form w/ editing task state:
	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title);
			setDescription(editingTask.description || "");
			setPriority(editingTask.priority || "");
		} else {
			setTitle("");
			setDescription("");
			setPriority("");
		}
	}, [editingTask]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (editingTask && onUpdateTask) {
			onUpdateTask({
				...editingTask,
				title,
				description: description || undefined,
				priority: priority || undefined,
			});

			setEditingTask(null);

			setTitle("");
			setDescription("");
			setPriority("");
		} else {
			onAddTask({
				title,
				description: description || undefined,
				priority: priority || undefined,
			});
		}
	}
	return (
		<form
			className="row g-2 align-items-center mb-4"
			onSubmit={handleSubmit}
		>
			<input
				className="form-control col me-2"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				className="form-control col me-2"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<select
				className="form-select col"
				value={priority}
				onChange={(e) =>
					setPriority(
						e.target.value as "" | "low" | "medium" | "high",
					)
				}
			>
				<option value="">None</option>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>

			<button
				className="btn btn-success btn-sm col-auto ms-2"
				type="submit"
			>
				{editingTask ? "Update Task" : "Create Task"}
			</button>

			{editingTask && (
				<button
					className="btn btn-outline-secondary col-auto"
					type="button"
					onClick={() => setEditingTask(null)}
				>
					Cancel
				</button>
			)}
		</form>
	);
}

export default TaskForm;
