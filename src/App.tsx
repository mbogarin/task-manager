// Imports:
import { useState } from "react";
import type { Task } from "./types/task";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

// App Component:
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

	return (
		<div>
			<h1>Task Dashboard</h1>

			{/* Dashboard Statistics: */}
			<div>
				<p>Total Tasks: {totalTasks}</p>
				<p>Completed Tasks: {completedTasks}</p>
				<p>Active Tasks: {activeTasks}</p>
			</div>

			<div>
				<button
					onClick={() => setFilter("all")}
					className={filter === "all" ? "active-filter" : ""}
				>
					All
				</button>
				<button
					onClick={() => setFilter("active")}
					className={filter === "active" ? "active-filter" : ""}
				>
					Active
				</button>
				<button
					onClick={() => setFilter("completed")}
					className={filter === "completed" ? "active-filter" : ""}
				>
					Completed
				</button>
			</div>

			{/* Task Form: */}
			<TaskForm
				onAddTask={addTask}
				onUpdateTask={updateTask}
				editingTask={editingTask}
				// isEditing={isEditing}
				setEditingTask={setEditingTask}
			/>
			{/* Task Details: */}
			{selectedTask && (
				<div>
					<h2>Task Details</h2>

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

					<button onClick={() => setSelectedTask(null)}>Close</button>
				</div>
			)}

			{/* Task Card: */}
			{filteredTasks.map((task) => (
				<TaskCard
					key={task.id}
					task={task}
					onDelete={deleteTask}
					onToggle={toggleTask}
					onEdit={(task) => {
						setEditingTask(task);
					}}
					onSelect={setSelectedTask}
				/>
			))}
		</div>
	);
}

export default App;
