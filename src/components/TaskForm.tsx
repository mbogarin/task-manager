// Task creation & editing form component:

import { useState } from "react";
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

// = Reusable task form:
function TaskForm({
	onAddTask,
	onUpdateTask,
	editingTask,
	setEditingTask,
}: TaskFormProps) {
	// = State management:
	const [title, setTitle] = useState(editingTask?.title ?? "");
	const [description, setDescription] = useState(
		editingTask?.description ?? "",
	);
	const [priority, setPriority] = useState<"low" | "medium" | "high" | "">(
		editingTask?.priority ?? "",
	);

	// Reset form
	const resetForm = () => {
		setTitle("");
		setDescription("");
		setPriority("");
	};

	// = Title validation:
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim()) return;
		if (editingTask && onUpdateTask) {
			onUpdateTask({
				...editingTask,
				title,
				description: description || undefined,
				priority: priority || undefined,
			});

			setEditingTask(null);
			resetForm();
		} else {
			onAddTask({
				title,
				description: description || undefined,
				priority: priority || undefined,
			});
			resetForm();
		}
	}
	return (
		// = FORM (CREATING/EDITING):
		<form
			className="row g-2 align-items-center mb-4"
			onSubmit={handleSubmit}
		>
			{/* 1. Title */}
			<input
				className="form-control col me-2"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			{/* 2. Description: */}
			<input
				className="form-control col me-4"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			{/* Priority: */}
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

			{/* FORM BUTTONS: */}
			{/* 1. Create/Update buttons: */}
			<button
				className="btn btn-primary btn-sm col-auto mx-2"
				type="submit"
			>
				{editingTask ? "Update Task" : "Create Task"}
			</button>

			{/* 2. Cancel button: */}
			{editingTask && (
				<button
					className="btn btn-sm btn-outline-secondary col-auto"
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
