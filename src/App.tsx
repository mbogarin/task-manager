// [Imports]:
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import type { Task } from "./types/task";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

// [App Component]:
function App() {
	// State variables:
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	// const [isEditing, setIsEditing] = useState(false);

	// Test:
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: 1,
			title: "title 1",
			completed: false,
			description: "description...",
			priority: "high",
		},
		{
			id: 2,
			title: "title 2",
			completed: false,
		},
	]);

	// Create Task:
	function addTask(task: {
		title: string;
		description?: string;
		priority?: "low" | "medium" | "high";
	}) {
		const newTask = {
			id: Date.now(),
			completed: false,
			...task,
		};
		setTasks((prev) => [...prev, newTask]);

		// setIsEditing(false);
		setEditingTask(null);
	}

	// Delete Task:
	function deleteTask(id: number) {
		setTasks((prev) => prev.filter((task) => task.id !== id));

		setSelectedTask((prev) => (prev && prev.id === id ? null : prev));
	}

	// Toggle Task Completion:
	function toggleTask(id: number) {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	}

	// Update Task:
	function updateTask(updatedTask: Task) {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		);
	}

	// Calculate Dashboard Statistics:
	// 1. Total tasks:
	const totalTasks = tasks.length;
	// 2. Completed tasks:
	const completedTasks = tasks.filter((task) => task.completed).length;
	// 3. Active tasks:
	const activeTasks = tasks.filter((task) => !task.completed).length;

	const filteredTasks = tasks.filter((task) => {
		if (filter === "active") {
			return !task.completed;
		}

		if (filter === "completed") {
			return task.completed;
		}

		return true;
	});

	// [RETURNED JSX]:
	return (
		<div className="container py-4">
			<h1 className="mb-4 text-center">
				<strong>Task Dashboard</strong>
			</h1>

			{/* Dashboard Statistics: */}
			<div className="row mb-4 text-center">
				<div className="col">
					<div className="card p-2">Total Tasks: {totalTasks}</div>
				</div>

				<div className="col">
					<div className="card p-2">
						Completed Tasks: {completedTasks}
					</div>
				</div>

				<div className="col">
					<div className="card p-2">Active Tasks: {activeTasks}</div>
				</div>
			</div>

			{/* Filter Buttons: */}
			<div className="btn-group mb-3">
				<button
					onClick={() => setFilter("all")}
					className={`btn ${
						filter === "all" ? "btn-primary" : "btn-outline-primary"
					}`}
				>
					All
				</button>
				<button
					onClick={() => setFilter("active")}
					className={`btn ${
						filter === "active"
							? "btn-primary"
							: "btn-outline-primary"
					}`}
				>
					Active
				</button>
				<button
					onClick={() => setFilter("completed")}
					className={`btn ${
						filter === "completed"
							? "btn-primary"
							: "btn-outline-primary"
					}`}
				>
					Completed
				</button>
			</div>

			{/* Task Form: */}
			<TaskForm
				onAddTask={addTask}
				onUpdateTask={updateTask}
				editingTask={editingTask}
				setEditingTask={setEditingTask}
			/>
			{/* Task Details: */}
			{selectedTask && (
				<div>
					<h4 className="mt-5">Task Details</h4>
					<div className="card shadow-sm p-3 mb-2">
						<p>
							<strong>Title:</strong> {selectedTask.title}
						</p>

						{selectedTask.description && (
							<p>
								<strong>Description:</strong>{" "}
								{selectedTask.description}
							</p>
						)}
						<p>
							<strong>Priority:</strong>{" "}
							{selectedTask.priority || "None"}
						</p>
						<p>
							<strong>Status:</strong>{" "}
							{selectedTask.completed ? "Completed" : "Active"}
						</p>
					</div>

					<button
						className="btn btn-sm btn-outline-secondary mb-5 mt-2"
						onClick={() => setSelectedTask(null)}
					>
						Close
					</button>
				</div>
			)}

			{/* Task List: */}
			<div className="d-grip gap-2">
				{filteredTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						onDelete={deleteTask}
						onToggle={toggleTask}
						onEdit={setEditingTask}
						onSelect={setSelectedTask}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
