import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";

// Reusable Components:
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function DashboardPage() {
	const navigate = useNavigate();

	// [AUTHENTICATION HOOKS]:
	const {
		isLoading, // Loading state - the SDK needs to reach Auth0 on load.
		isAuthenticated,
		user, // User profile.
	} = useAuth0();

	// [STATE HOOKS]:
	const { tasks, addTask, updateTask, deleteTask, toggleTask } =
		useTaskContext();

	// = State variables:
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
	const handleEditTask = (task) => {
		setEditingTask(task);
	};

	// = EARLY RETURNS:
	if (isLoading) {
		return <div className="container py-4">Loading...</div>;
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="container py-5 text-center">
				<h3>Please log in to view your tasks</h3>
				<button
					className="btn btn-primary mt-3"
					onClick={() => navigate("/login")}
				>
					Login
				</button>
			</div>
		);
	}

	// [FILTERING]:
	// = Calculate Dashboard Statistics:
	const userTasks = tasks.filter((task) => task.clientId === "demo-user");

	const totalTasks = userTasks.length;
	const completedTasks = userTasks.filter((task) => task.completed).length;
	const activeTasks = userTasks.filter((task) => !task.completed).length;

	const filteredTasks = userTasks.filter((task) => {
		if (filter === "active") return !task.completed;
		if (filter === "completed") return task.completed;
		return true;
	});

	// [RETURNING JSX]:
	return (
		<div className="container py-4">
			{/* DASHBOARD: */}
			<h1 className="mb-4">Task Dashboard</h1>

			{/* stats Row: */}
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

			{/* TASK FILTER BUTTONS */}
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
				editingTask={editingTask}
				setEditingTask={setEditingTask}
			/>

			{/* TASK LIST: */}
			<div className="d-grid gap-2">
				{filteredTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						onDelete={deleteTask}
						onToggle={toggleTask}
						onEdit={handleEditTask}
						onSelect={() => navigate(`/tasks/${task.id}`)}
					/>
				))}
			</div>
		</div>
	);
}

export default DashboardPage;
