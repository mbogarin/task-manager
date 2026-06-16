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
		<div>
			<h3>{task.title}</h3>

			{task.description && <p>{task.description}</p>}

			<p>Completed: {task.completed ? "Completed" : "Active"}</p>

			{/* {task.priority && <p>Priority: {task.priority}</p>} */}

			{/* Actions: */}
			<button
				onClick={(e) => {
					e.stopPropagation();
					onToggle(task.id);
				}}
			>
				{task.completed ? "Mark Active" : "Mark Completed"}
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onEdit(task);
				}}
			>
				Edit
			</button>

			<button
				onClick={(e) => {
					e.stopPropagation();
					onDelete(task.id);
				}}
			>
				Delete
			</button>

			<button
				onClick={(e) => {
					e.stopPropagation();
					onSelect(task);
				}}
			>
				View
			</button>
		</div>
	);
}

export default TaskCard;
