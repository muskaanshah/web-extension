function TodoInput({ state, todoInputHandler, addTodo }) {
	return (
		<input
			type="text"
			autoFocus
			className="todo-text input-text mb-0"
			placeholder="New Todo"
			value={state.newTodoValue}
			onChange={(e) => todoInputHandler(e)}
			onKeyPress={(e) => {
				e.key === "Enter" && addTodo(e);
			}}
		/>
	);
}

export { TodoInput };
