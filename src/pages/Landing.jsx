import "./landingpage.css";
import "./loader.css";
import { useEffect, useReducer } from "react";
import { reducerFunc } from "../reducers/landingPageReducer";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { Countdown } from "../components/countdown/Countdown";
import { TimeDisplay } from "../components/TimeDisplay/TimeDisplay";
import { TodoWrapper } from "../components/Todo/TodoWrapper";

const initialState = {
	userName: "",
	focusFinal: "",
	focus: "",
	todoCompleted: false,
	edit: false,
	settingsModal: false,
};

function Landing() {
	const [state, dispatch] = useReducer(reducerFunc, initialState);
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
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<TimeDisplay username={state.userName} />
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
				<TodoWrapper />
				<GoogleSearch />
			</div>
		</div>
	);
}

export { Landing };
