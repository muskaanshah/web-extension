function Focus({ state, dispatch }) {
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
		<>
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
							e.key === "Enter" && inputFocusHandler(e);
						}}
					/>
				</>
			)}
		</>
	);
}

export { Focus };