import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import { useEffect, useReducer, useState } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";
import { Focus } from "../components/Focus/Focus";

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
	const hour = today.getHours();
	const wish = `Good ${
		(hour < 12 && "morning") || (hour < 17 && "afternoon") || "evening"
	}`;
	const time12 = `${today.getHours()}:${today.getMinutes()}`;
	useEffect(() => {
		setInterval(() => {
			setDate(() => new Date());
		}, 1000);
	}, []);
	useEffect(() => {
		const user = localStorage.getItem("name");
		dispatch({ type: "SET_USERNAME", payload: { value: user } });
		const focus = localStorage.getItem("Focus");
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: focus } });
	}, []);
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="time-display fw-500 mb-0">{time12}</p>;
				<p className="fw-600 nametag mt-0 mb-0-5">
					{wish}, {state.userName}
				</p>
				<Focus state={state} dispatch={dispatch} />
				<p className="todotag-bottom-right">Todo</p>
				<div className="weather-top-right">
					<p className="fs-1-25 fw-500 mb-0">27°</p>
					<p className="fs-0-8 my-0">Chennai</p>
				</div>
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
