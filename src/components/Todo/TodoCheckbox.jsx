function TodoCheckbox({ dispatch, curTodo }) {
	return (
		<label className="label-todo pb-0-5">
			<input
				type="checkbox"
				className="todo-checkbox"
				checked={curTodo.todoCompleted}
				onClick={() =>
					dispatch({
						type: "SET_TODO_COMPLETED",
						payload: { value: curTodo.id },
					})
				}
			/>
			<span
				className="mx-1 fw-300 fs-0-9"
				style={{
					textDecoration: curTodo.todoCompleted && "line-through",
					textAlign: "left",
				}}
			>
				{curTodo.todoName}
			</span>
			<div className="todo-icons">
				<button className="btn-todo">
					<span
						className="material-icons-outlined"
						onClick={() =>
							dispatch({ type: "SET_TODO_EDIT", payload: { value: true } })
						}
					>
						edit
					</span>
				</button>
				<button className="btn-todo">
					<span
						className="material-icons-outlined"
						onClick={() =>
							dispatch({ type: "CLEAR_TODO", payload: { value: curTodo.id } })
						}
					>
						close
					</span>
				</button>
			</div>
		</label>
	);
}

export { TodoCheckbox };
