import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import { useEffect, useReducer, useState } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";

const initialState = {
	userName: "",
	focusFinal: "",
	focus: "",
	todoCompleted: false,
	edit: false,
};

function Landing() {
	const [state, dispatch] = useReducer(reducerFunc, initialState);
	const [today, setDate] = useState(new Date());
	const [is24HourFormat, setTo24HourFormat] = useState(true);
	const hour = today.getHours();
	const minute = today.getMinutes();
	const minutes = minute / 10 < 1 ? `0${minute}` : minute;
	const wish = `Good ${
		(hour < 12 && "morning") || (hour < 16 && "afternoon") || "evening"
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
			localStorage.setItem("setupTime", day);
		}
	}
	useEffect(() => {
		const user = localStorage.getItem("name");
		dispatch({ type: "SET_USERNAME", payload: { value: user } });
		const focus = localStorage.getItem("Focus");
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: focus } });
		setInterval(() => {
			setDate(() => new Date());
		}, 1000);
	}, []);
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<div className="centered">
					<p className="time-display fw-500 mb-0">
						{is24HourFormat ? time24 : time12}
					</p>
					<button
						className="btn-focusaction"
						onClick={() => setTo24HourFormat((prev) => !prev)}
					>
						<span className="material-icons-outlined">repeat</span>
					</button>
				</div>
				<p className="fw-600 nametag mt-0 mb-1">
					{wish}, {state.userName}
				</p>
				<Focus state={state} dispatch={dispatch} />
				<p className="todotag-bottom-right">Todo</p>
				<Weather />
				<p className="quote-bottom-center">
					"Attitude makes all the difference"
				</p>
				<div className="todo-bottom-right">
					<Todo />
				</div>
			</div>
		</div>
	);
}

export { Landing };
