import "./todo.css";
import { TodoCheckbox } from "./TodoCheckbox";
import { TodoInput } from "./TodoInput";

function Todo({ state, dispatch }) {
	const addTodo = (e) => {
		dispatch({ type: "ADD_TODO", payload: { value: e.target.value } });
		dispatch({ type: "CHANGE_TODO_VALUE", payload: { value: "" } });
	};
	const todoInputHandler = (e) => {
		dispatch({ type: "CHANGE_TODO_VALUE", payload: { value: e.target.value } });
	};
	return (
		<div>
			{state.createTodo || state.todo.length !== 0 ? (
				<>
					{state.todo.length !== 0 ? (
						<div className="todo-list pb-3 pl-1">
							<div className="flex-space-between my-1">
								<p className="date-tag fs-1-25 pl-1 my-0">Today</p>
								<button
									className="btn btn-todo mr-0-5"
									onClick={() => dispatch({ type: "OPEN_TODO_MODAL" })}
								>
									<span className="material-icons-outlined">expand_more</span>
								</button>
							</div>
							<div className="todo-scrollbar">
								{state.todo.map((curTodo) => (
									<TodoCheckbox dispatch={dispatch} curTodo={curTodo} />
								))}
							</div>
							<TodoInput
								state={state}
								todoInputHandler={todoInputHandler}
								addTodo={addTodo}
							/>
						</div>
					) : (
						<div className="todo">
							<div className="flex-space-between my-1">
								<p className="date-tag fs-1-25 pl-1 my-0">Today</p>
								<button
									className="btn btn-todo mr-0-5"
									onClick={() => dispatch({ type: "OPEN_TODO_MODAL" })}
								>
									<span className="material-icons-outlined">expand_more</span>
								</button>
							</div>
							<div className="centered" style={{ height: "50%" }}>
								<p>No todos added yet</p>
							</div>
							<TodoInput
								state={state}
								todoInputHandler={todoInputHandler}
								addTodo={addTodo}
							/>
						</div>
					)}
				</>
			) : (
				<div className="todo todo-content">
					<p className="fs-0-9">No todos yet</p>
					<button
						className="btn btn-sm bg-grey-light borderradius-2"
						onClick={() => dispatch({ type: "START_TODO_LIST" })}
					>
						Add todo
					</button>
				</div>
			)}
		</div>
	);
}

export { Todo };
