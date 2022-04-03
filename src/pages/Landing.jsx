import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import "./loader.css";
import { useEffect, useReducer } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { todoReducer } from "../reducers/todoreducer";
import { Countdown } from "../components/countdown/Countdown";
import { TimeDisplay } from "../components/TimeDisplay/TimeDisplay";

const initialState = {
	userName: "",
	focusFinal: "",
	focus: "",
	todoCompleted: false,
	edit: false,
	settingsModal: false,
};

function Landing() {
	const initialTodoList = !localStorage.getItem("Todos")
		? []
		: JSON.parse(localStorage.getItem("Todos"));

	const initialStateTodos = {
		todo: initialTodoList,
		createTodo: false,
		newTodoValue: "",
		todoModal: false,
	};
	const [state, dispatch] = useReducer(reducerFunc, initialState);
	const [stateTodo, dispatchTodo] = useReducer(todoReducer, initialStateTodos);
	const changeNameHandler = () => {
		localStorage.setItem("name", "");
		dispatch({
			type: "OPEN_SETTINGS_MODAL",
		});
		window.location.reload(false);
	};
	useEffect(() => {
		const user = localStorage.getItem("name");
		dispatch({ type: "SET_USERNAME", payload: { value: user } });
		const focus = localStorage.getItem("Focus");
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: focus } });
	}, []);

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(stateTodo.todo));
	}, [stateTodo.todo]);
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<TimeDisplay username={state.username} />
				<Focus state={state} dispatch={dispatch} />
				<div className="settings-hover">
					{state.settingsModal && (
						<button
							className="btn btn-change-name ml-0"
							onClick={changeNameHandler}
						>
							Change name
						</button>
					)}
					<span
						className="material-icons-outlined"
						onClick={() =>
							dispatch({
								type: "OPEN_SETTINGS_MODAL",
							})
						}
					>
						settings
					</span>
				</div>
				<Weather />
				<Countdown />
				<Quote />
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
				<GoogleSearch />
			</div>
		</div>
	);
}

export { Landing };
