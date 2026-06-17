import type { Task } from "../types/task";

type TaskCardProps = {
	task: Task;
	onDelete: (id: number) => void;
	onToggle: (id: number) => void;
	onEdit: (task: Task) => void;
	onSelect: (task: Task) => void;
};

// Resuable task card component:
function TaskCard({
	task,
	onDelete,
	onToggle,
	onEdit,
	onSelect,
}: TaskCardProps) {
	return (
		// ! STYLE:
		<div className="card shadow-sm p-3 mb-4">
			{/* <div className="list-group-item d-flex justfiy content-between align-items-center"> */}

			{/* COMPLETION STATUS: */}
			<span
				className={`mb-3 py-2 badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}
			>
				{" "}
				{task.completed ? "COMPLETED" : "ACTIVE"}
			</span>

			{/* TASK DETAILS: */}
			<div>
				<h5 className="mb-1 fw-bold">{task.title}</h5>
				<p className="mb-1">{task.description}</p>
				<small>Priority: {task.priority}</small>
			</div>

			{/* ACTION BUTTONS: */}
			<div className="d-flex gap-2 mt-4">
				{/* 1. Status button: */}
				<button
					className="btn btn-sm btn-outline-success"
					onClick={(e) => {
						e.stopPropagation();
						onToggle(task.id);
					}}
				>
					{task.completed ? "Mark Active" : "Mark Completed"}
				</button>

				{/* 2. Edit button: */}
				<button
					className="btn btn-sm btn-secondary"
					onClick={(e) => {
						e.stopPropagation();
						onEdit(task);
					}}
				>
					Edit
				</button>

				{/* 3. Delete button: */}
				<button
					className="btn btn-sm btn-danger"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(task.id);
					}}
				>
					Delete
				</button>

				{/* 4. View details button: */}
				<button
					className="btn btn-sm btn-primary"
					onClick={(e) => {
						e.stopPropagation();
						onSelect(task);
					}}
				>
					View
				</button>
			</div>
		</div>
	);
}

export default TaskCard;
