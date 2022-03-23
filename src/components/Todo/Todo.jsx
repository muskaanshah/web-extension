import { useEffect, useReducer } from "react";
import "./todo.css";

const initialState = {
	todo: [],
	createTodo: false,
	newTodoValue: "",
	localTodos: [],
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case "START_TODO_LIST":
			return { ...state, createTodo: true };
		case "ADD_TODO":
			return {
				...state,
				todo: [...state.todo, { todoName: action.payload.value }],
			};
		case "CHANGE_TODO_VALUE":
			return { ...state, newTodoValue: action.payload.value };
		default:
			return state;
	}
};

function Todo() {
	const [state, dispatch] = useReducer(todoReducer, initialState);

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(state.todo));
		// dispatch({type: "SET_FROM_LOCALSTORAGE"})
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
				{!state.createTodo ? (
					<>
						<p className="fs-0-9">No todos yet</p>
						<button
							className="btn btn-sm bg-grey-light borderradius-2"
							onClick={() => dispatch({ type: "START_TODO_LIST" })}
						>
							Add todo
						</button>
					</>
				) : (
					<>
						<div className="todo-list">
							<p className="individual-todo">
								{state.todo.map((curTodo) => curTodo.todoName)}
							</p>
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
				)}
			</div>
		</div>
	);
}

export { Todo };
