import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import { useEffect, useReducer } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";

function Landing() {
	const initialState = {
		userName: "",
		focusFinal: "",
		focus: "",
		todoCompleted: false,
		edit: false,
	};
	const [state, dispatch] = useReducer(reducerFunc, initialState);

	useEffect(() => {
		const user = localStorage.getItem("name");
		dispatch({ type: "SET_USERNAME", payload: { value: user } });
		const focus = localStorage.getItem("Focus");
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: focus } });
	}, []);

	const inputFocusHandler = (e) => {
		const finalFocus = localStorage.getItem("Focus");
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: finalFocus } });
		dispatch({ type: "SET_EDIT", payload: { value: false } });
	};

	const onChangeHandler = (e) => {
		localStorage.setItem("Focus", e.target.value);
		dispatch({
			type: "SET_FOCUS",
			payload: { value: e.target.value },
		});
	};
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="time-display fw-500 mb-0">11:08</p>
				<p className="fw-600 nametag mt-0 mb-0-5">
					Good evening, {state.userName}
				</p>
				{state.focusFinal && !state.edit ? (
					<>
						<p className="fw-500 mt-2">TODAY</p>
						<label className="label-focus">
							<input
								type="checkbox"
								className="focus-checkbox"
								onClick={() =>
									dispatch({
										type: "SET_TODO_COMPLETED",
									})
								}
							/>
							<span
								className="my-0 fs-1-5 fw-600 mx-1"
								style={{
									textDecoration: state.todoCompleted && "line-through",
								}}
							>
								{state.focusFinal}
							</span>
							<button className="btn-focusaction">
								<span
									className="material-icons-outlined smaller-icon"
									onClick={() =>
										dispatch({ type: "SET_EDIT", payload: { value: true } })
									}
								>
									edit
								</span>
							</button>
							<button className="btn-focusaction">
								<span
									className="material-icons-outlined"
									onClick={() => dispatch({ type: "CLEAR_FOCUS" })}
								>
									close
								</span>
							</button>
						</label>
						<p
							className="appreciation-text"
							style={{
								opacity: `${state.todoCompleted ? "1" : "0"}`,
								transition: "opacity 1s ease-out",
							}}
						>
							Great work!
						</p>
					</>
				) : (
					<>
						<p className="fw-500 focustag my-0">
							What's your main focus for today?
						</p>
						<input
							type="text"
							className="fw-500 name-text focus-text"
							value={state.edit ? localStorage.getItem("Focus") : state.focus}
							onChange={(e) => onChangeHandler(e)}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									inputFocusHandler(e);
								}
							}}
						/>
					</>
				)}
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
