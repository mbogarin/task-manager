import type React from "react";
import type { Task } from "../types/task";

type TaskCardProps = {
	task: Task;
	onDelete: (id: number) => void;
	onToggle: (id: number) => void;
	onEdit: (task: Task) => void;
	onSelect: (task: Task) => void;
};

// = Resuable task card component:
function TaskCard({
	task,
	onDelete,
	onToggle,
	onEdit,
	onSelect,
}: TaskCardProps) {
	const handleAction = (
		e: React.MouseEvent<HTMLButtonElement>,
		action: () => void,
	) => {
		e.stopPropagation();
		action();
	};

	return (
		<div className="card shadow-md p-3 mb-4 w-80">
			{/*//= COMPLETION STATUS: */}
			<span
				style={{ width: "6rem" }}
				className={`text-align-center mb-4 py-2 badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}
			>
				{" "}
				{task.completed ? "COMPLETED" : "ACTIVE"}
			</span>

			{/*//=  TASK DETAILS: */}
			<div>
				<h4 className="mb-2 fw-bold">{task.title}</h4>
				<h6 className="mb-3">{task.description}</h6>
				<small className="">Priority: {task.priority}</small>
			</div>

			{/*//= ACTION BUTTONS: */}
			<div className="d-flex flex-wrap gap-2 mt-4">
				{/* 1. Edit button: */}
				<button
					className="btn btn-sm btn-secondary"
					onClick={(e) => handleAction(e, () => onEdit(task))}
				>
					Edit
				</button>

				{/* 2. Delete button: */}
				<button
					className="btn btn-sm btn-danger"
					onClick={(e) => handleAction(e, () => onDelete(task.id))}
				>
					Delete
				</button>

				{/* 3. View details button: */}
				<button
					className="btn btn-sm btn-primary"
					onClick={(e) => handleAction(e, () => onSelect(task))}
				>
					View
				</button>

				{/* 4. Status button: */}
				<button
					className="btn btn-sm btn-outline-success"
					onClick={(e) => handleAction(e, () => onToggle(task.id))}
				>
					{task.completed ? "Mark Active" : "Mark Completed"}
				</button>
			</div>
		</div>
	);
}

export default TaskCard;
