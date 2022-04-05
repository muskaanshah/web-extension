import "./focus.css";
import { useEffect, useReducer } from "react";
import { reducerFunc } from "../../reducers/landingPageReducer";

function Focus() {
	const initialState = {
		focusFinal: "",
		focus: "",
		todoCompleted: false,
		edit: false,
	};
	const [state, dispatch] = useReducer(reducerFunc, initialState);
	const inputFocusHandler = () => {
		const finalFocus = JSON.parse(localStorage.getItem("Focus"));
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: finalFocus } });
		dispatch({ type: "SET_EDIT", payload: { value: false } });
	};

	const onChangeHandler = (e) => {
		localStorage.setItem(
			"Focus",
			JSON.stringify({
				...JSON.parse(localStorage.getItem("Focus")),
				focus: e.target.value,
			})
		);
		dispatch({
			type: "SET_FOCUS",
			payload: { value: e.target.value },
		});
	};

	const APPRECIATION_ARRAY = [
		"Great work!",
		"Nice!",
		"Way to go!",
		"Good job!",
	];

	useEffect(() => {
		const focus = JSON.parse(localStorage.getItem("Focus")) ?? {};
		dispatch({ type: "SET_FINAL_FOCUS", payload: { value: focus } });
	}, []);
	return (
		<>
			{state.focusFinal && !state.edit ? (
				<>
					<p className="fw-500 mt-2">MAIN FOCUS FOR TODAY</p>
					<label className="label-focus">
						<input
							type="checkbox"
							checked={JSON.parse(localStorage.getItem("Focus")).todoCompleted}
							className="focus-checkbox"
							onClick={() =>
								dispatch({
									type: "SET_TODO_COMPLETED",
								})
							}
						/>
						<span
							className={`my-0 fs-1-5 fw-600 mx-1 ${
								state.todoCompleted && "text-strikethrough"
							}`}
						>
							{state.focusFinal}
						</span>
						<button
							className="btn-focusaction"
							onClick={() =>
								dispatch({ type: "SET_EDIT", payload: { value: true } })
							}
						>
							<span className="material-icons-outlined smaller-icon">edit</span>
						</button>
						<button
							className="btn-focusaction"
							onClick={() => dispatch({ type: "CLEAR_FOCUS" })}
						>
							<span className="material-icons-outlined">close</span>
						</button>
					</label>
					<div
						className="my-1"
						style={{
							opacity: `${state.todoCompleted ? "1" : "0"}`,
							transition: "opacity 1s ease-in",
						}}
					>
						{state.todoCompleted ? (
							APPRECIATION_ARRAY[Math.floor(Math.random() * 4)]
						) : (
							<p className="my-0 blank">.</p>
						)}
					</div>
				</>
			) : (
				<>
					<p className="fw-500 focustag my-0">
						What's your main focus for today?
					</p>
					<input
						type="text"
						className="fw-500 name-text focus-text"
						value={
							state.edit
								? JSON.parse(localStorage.getItem("Focus")).focus
								: state.focus
						}
						onChange={(e) => onChangeHandler(e)}
						onKeyPress={(e) => {
							e.key === "Enter" && inputFocusHandler();
						}}
					/>
				</>
			)}
		</>
	);
}

export { Focus };
