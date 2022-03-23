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
				className="mx-1 fw-300"
				style={{
					textDecoration: curTodo.todoCompleted && "line-through",
				}}
			>
				{curTodo.todoName}
			</span>
		</label>
	);
}

export { TodoCheckbox };