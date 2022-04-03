import { Todo } from "./Todo";
import { useReducer, useEffect } from "react";
import { todoReducer } from "../../reducers/todoreducer";

function TodoWrapper() {
	const initialTodoList = !localStorage.getItem("Todos")
		? []
		: JSON.parse(localStorage.getItem("Todos"));

	const initialStateTodos = {
		todo: initialTodoList,
		createTodo: false,
		newTodoValue: "",
		todoModal: false,
	};
	const [stateTodo, dispatchTodo] = useReducer(todoReducer, initialStateTodos);

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(stateTodo.todo));
	}, [stateTodo.todo]);
	return (
		<>
			<p
				className="todotag-bottom-right"
				onClick={() => dispatchTodo({ type: "OPEN_TODO_MODAL" })}
			>
				Todo
			</p>
			{stateTodo.todoModal && (
				<div className="todo-bottom-right">
					<Todo state={stateTodo} dispatch={dispatchTodo} />
				</div>
			)}
		</>
	);
}

export { TodoWrapper };
