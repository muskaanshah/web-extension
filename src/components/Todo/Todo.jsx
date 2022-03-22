import "./todo.css";

function Todo() {
	return (
		<div className="todo">
			<p className="date-tag fs-1-25 pl-1">Today</p>
			<div className="todo-content">
				<p className="fs-0-9">No todos yet</p>
				<button className="btn btn-sm bg-grey-light borderradius-2">
					Add todo
				</button>
			</div>
		</div>
	);
}

export { Todo };
