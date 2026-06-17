// MAIN TASK MANAGEMENT AREA:

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { useTaskContext } from "../context/useTaskContext";

import type { Auth0User } from "../types/auth";
import type { Task } from "../types/task";

// Reusable Components:
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function DashboardPage() {
	const navigate = useNavigate();
	const location = useLocation();

	// Authentication hooks:
	const { isLoading, user } = useAuth0();
	const authUser = user as Auth0User;

	// State hooks:
	const { tasks, addTask, updateTask, deleteTask, toggleTask } =
		useTaskContext();

	// State variables:
	const [editingTask, setEditingTask] = useState<Task | null>(
		() =>
			(location.state as { editingTask?: Task } | null)?.editingTask ??
			null,
	);

	// Task filtering:
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

	useEffect(() => {
		if (location.state?.editingTask) {
			window.history.replaceState({}, document.title); // clear state
		}
	}, [location.state]);

	if (isLoading) {
		return <div className="container py-4">Loading...</div>;
	}

	// Calculate Dashboard Statistics:
	const userTasks = tasks.filter((task) => task.clientId === authUser?.sub);
	const totalTasks = userTasks.length;
	const completedTasks = userTasks.filter((task) => task.completed).length;
	const activeTasks = userTasks.filter((task) => !task.completed).length;

	const filteredTasks = userTasks.filter((task) => {
		if (filter === "active") return !task.completed;
		if (filter === "completed") return task.completed;
		return true;
	});

	// RETURNING JSX:
	return (
		<div className="container py-4">
			{/* DASHBOARD: */}
			<h1 className="mb-4">Task Dashboard</h1>

			{/* STATS ROW: */}
			<div className="row mb-4 text-center">
				<div className="col">
					<div className="card p-2">
						<h5>Total Tasks:</h5>
						<p className="fs-4 mb-0">{totalTasks}</p>
					</div>
				</div>

				<div className="col">
					<div className="card p-2">
						<h5>Active:</h5>
						<p className="fs-4 mb-0">{activeTasks}</p>
					</div>
				</div>

				<div className="col">
					<div className="card p-2">
						<h5>Completed:</h5>
						<p className="fs-4 mb-0">{completedTasks}</p>
					</div>
				</div>
			</div>

			{/* FILTER BUTTONS */}
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

			{/* TASK FORM: */}
			<TaskForm
				onAddTask={addTask}
				onUpdateTask={updateTask}
				editingTask={null}
				setEditingTask={setEditingTask}
			/>

			{/* EDIT MODAL: */}
			{editingTask && (
				<div
					className="modal fade show d-block"
					tabIndex={-1}
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
					onClick={() => setEditingTask(null)}
				>
					<div
						className="modal-dialog modal-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="modal-content rounded-4 shadow-md border border-primary">
							<div className="modal-header border-0  pb-0">
								<h5 className="modal-title fw-semibold">
									Edit Task
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setEditingTask(null)}
								/>
							</div>

							<div className="modal-body pt-2">
								<TaskForm
									onAddTask={addTask}
									onUpdateTask={updateTask}
									editingTask={editingTask}
									setEditingTask={setEditingTask}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* TASK LIST: */}
			<div className="d-grid gap-2">
				{filteredTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						onDelete={deleteTask}
						onToggle={toggleTask}
						onEdit={setEditingTask}
						onSelect={() => navigate(`/tasks/${task.id}`)}
					/>
				))}
			</div>
		</div>
	);
}

export default DashboardPage;
