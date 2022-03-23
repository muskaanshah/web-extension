import { useEffect, useReducer } from "react";
import "./todo.css";
import { TodoCheckbox } from "./TodoCheckbox";
import { todoReducer } from "../../reducers/todoreducer";

const initialTodoList = !localStorage.getItem("Todos")
	? []
	: JSON.parse(localStorage.getItem("Todos"));

const initialState = {
	todo: initialTodoList,
	createTodo: false,
	newTodoValue: "",
};

function Todo() {
	const [state, dispatch] = useReducer(todoReducer, initialState);

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(state.todo));
	}, [state.todo]);

	const addTodo = (e) => {
		dispatch({ type: "ADD_TODO", payload: { value: e.target.value } });
		dispatch({ type: "CHANGE_TODO_VALUE", payload: { value: "" } });
	};
	const todoInputHandler = (e) => {
		dispatch({ type: "CHANGE_TODO_VALUE", payload: { value: e.target.value } });
	};
	return (
		<div className="todo borderradius-0-5">
			<p className="date-tag fs-1-25 pl-1">Today</p>
			<div className="todo-content">
				{state.createTodo || state.todo.length !== 0 ? (
					<>
						<div className="todo-list">
							{state.todo ? (
								state.todo.map((curTodo) => (
									<TodoCheckbox dispatch={dispatch} curTodo={curTodo} />
								))
							) : (
								<div>No todos added yet</div>
							)}
						</div>
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
					</>
				) : (
					<>
						<p className="fs-0-9">No todos yet</p>
						<button
							className="btn btn-sm bg-grey-light borderradius-2"
							onClick={() => dispatch({ type: "START_TODO_LIST" })}
						>
							Add todo
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export { Todo };
