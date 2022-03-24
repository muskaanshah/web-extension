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
				className={`mx-1 fw-300 fs-0-9 date-tag ${
					curTodo.todoCompleted && "line-through"
				}`}
			>
				{curTodo.todoName}
			</span>
			<button className="btn-todo mr-0-5">
				<span
					className="material-icons-outlined"
					onClick={() =>
						dispatch({ type: "CLEAR_TODO", payload: { value: curTodo.id } })
					}
				>
					close
				</span>
			</button>
		</label>
	);
}

export { TodoCheckbox };
