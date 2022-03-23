import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";
import { useEffect, useState } from "react";

function Landing() {
	const [userName, setUserName] = useState("");
	const [focus, setFocus] = useState("");
	const [todoCompleted, setTodoCompleted] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("name");
		setUserName(() => user);
		const focus = localStorage.getItem("Focus");
		setFocus(() => focus);
	}, []);

	const inputFocusHandler = (e) => {
		localStorage.setItem("Focus", e.target.value);
		const focus = localStorage.getItem("Focus");
		setFocus(() => focus);
		setEdit(false);
	};

	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="time-display fw-500 mb-0">11:08</p>
				<p className="fw-600 nametag mt-0 mb-0-5">Good evening, {userName}</p>
				<p className="fw-500 focustag my-0">
					What's your main focus for today?
				</p>

				{focus && !edit ? (
					<>
						<p className="fw-500 mt-2">TODAY</p>
						<label>
							<input
								type="checkbox"
								className="focus-checkbox"
								value={focus}
								onClick={() =>
									setTodoCompleted((todoCompleted) => !todoCompleted)
								}
							/>
							<span
								className="my-0 fs-1-5 fw-600 mx-1"
								style={{ textDecoration: todoCompleted && "line-through" }}
							>
								{focus}
							</span>
							<button className="btn-edit">
								<span
									className="material-icons-outlined"
									onClick={() => setEdit(true)}
								>
									edit
								</span>
							</button>
						</label>
						<p
							className="appreciation-text"
							style={{
								opacity: `${todoCompleted ? "1" : "0"}`,
								transition: "opacity 1s ease-out",
							}}
						>
							Great work!
						</p>
					</>
				) : (
					<input
						type="text"
						className="fw-500 name-text focus-text"
						value={focus}
						onChange={(e) => setFocus(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								inputFocusHandler(e);
							}
						}}
					/>
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
