import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/useTaskContext";

function TaskDetailsPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { getTaskById } = useTaskContext();

	const task = id ? getTaskById(Number(id)) : null;

	if (!task) {
		return (
			<div className="container py-5">
				<h3>Task not found</h3>
				<button
					className="btn btn-secondary mt-3"
					onClick={() => navigate("/")}
				>
					Back
				</button>
			</div>
		);
	}
	return (
		<div className="container py-5">
			<div className="card shadow-sm p-4 mb-4">
				<h4 className="mb-3">Task Details</h4>

				<p>
					<strong>Title:</strong> {task.title}
				</p>

				{task.description && (
					<p>
						<strong>Description:</strong> {task.description}
					</p>
				)}

				<p>
					<strong>Priority:</strong> {task.priority || "None"}
				</p>
				<p>
					<strong>Status:</strong>{" "}
					{task.completed ? "Completed" : "Active"}
				</p>
			</div>

			{/* EDIT TASK BUTTON: */}
			<div className="d-flex gap-2 mt-3">
				<button
					className="btn btn-sm btn-outline-primary"
					onClick={() =>
						navigate("/", { state: { editingTask: task } })
					}
				>
					Edit Task
				</button>

				<button
					className="btn btn-sm btn-outline-secondary"
					onClick={() => navigate("/")}
				>
					Back to Dashboard
				</button>
			</div>
		</div>
	);
}

export default TaskDetailsPage;
