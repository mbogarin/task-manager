import type { Task } from "../types/task";

type TaskCardProps = {
	task: Task;
	onDelete: (id: number) => void;
	onToggle: (id: number) => void;
	onEdit: (task: Task) => void;
	onSelect: (task: Task) => void;
};

function TaskCard({
	task,
	onDelete,
	onToggle,
	onEdit,
	onSelect,
}: TaskCardProps) {
	return (
		<div className="card shadow-sm p-3 mb-2">
			<h5 className="mb-1">{task.title}</h5>

			{task.description && <p>{task.description}</p>}

			<span
				className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}
			>
				{" "}
				{task.completed ? "Completed" : "Active"}
			</span>

			{/* Action Buttons: */}
			<div className="d-flex gap-2 mt-2">
				<button
					className="btn btn-sm btn-outline-success"
					onClick={(e) => {
						e.stopPropagation();
						onToggle(task.id);
					}}
				>
					{task.completed ? "Mark Active" : "Mark Completed"}
				</button>

				<button
					className="btn btn-sm btn-warning"
					onClick={(e) => {
						e.stopPropagation();
						onEdit(task);
					}}
				>
					Edit
				</button>

				<button
					className="btn btn-sm btn-danger"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(task.id);
					}}
				>
					Delete
				</button>

				<button
					className="btn btn-sm btn-outline-primary"
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
