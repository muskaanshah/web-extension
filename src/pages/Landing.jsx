import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import "./loader.css";
import { useEffect, useReducer, useState } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { todoReducer } from "../reducers/todoreducer";
import { Countdown } from "../components/countdown/Countdown";

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
	const [today, setDate] = useState(new Date());
	const [is24HourFormat, setTo24HourFormat] = useState(true);
	const hour = today.getHours();
	const minute = today.getMinutes();
	const minutes = minute / 10 < 1 ? `0${minute}` : minute;
	const wish = `Good ${
		(hour < 4 && "night") ||
		(hour < 12 && "morning") ||
		(hour < 16 && "afternoon") ||
		(hour < 21 && "evening") ||
		"night"
	}`;
	const time24 = `${hour}:${minutes}`;
	const day = today.toLocaleDateString({ weekday: "long" });
	const hours = hour % 12 || 12;
	const time12 = `${hours}:${minutes}`;
	const setupTime = localStorage.getItem("setupTime");
	if (setupTime == null) {
		localStorage.setItem("setupTime", day);
	} else {
		if (day !== setupTime) {
			localStorage.removeItem("Focus");
			localStorage.removeItem("Todos");
			localStorage.removeItem("Quote");
			localStorage.setItem("setupTime", day);
		}
	}
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
		setInterval(() => {
			setDate(() => new Date());
		}, 1000);
	}, []);
	useEffect(() => {
		const timeformat = localStorage?.getItem("Timeformat");
		timeformat
			? setTo24HourFormat(JSON.parse(timeformat))
			: localStorage.setItem("Timeformat", is24HourFormat);
	}, [is24HourFormat]);

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(stateTodo.todo));
	}, [stateTodo.todo]);
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<div className="time-hover centered">
					<p className="time-display fw-500 mb-0">
						{is24HourFormat ? time24 : time12}
					</p>
					<button
						className="btn-focusaction btn-time-change"
						onClick={() => {
							setTo24HourFormat((prev) => {
								localStorage.setItem("Timeformat", !prev);
								return !prev;
							});
						}}
					>
						<span className="material-icons-outlined">repeat</span>
					</button>
				</div>
				<p className="fw-600 nametag mt-0 mb-1">
					{wish}, {state.userName}
				</p>
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
