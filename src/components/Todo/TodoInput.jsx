function TodoInput({ state, todoInputHandler, addTodo }) {
	return (
		<input
			type="text"
			className="todo-text"
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
