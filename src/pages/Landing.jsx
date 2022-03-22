import { Todo } from "../components/Todo/Todo";
import "./landingpage.css";

function Landing() {
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="time-display fw-500 mb-0">11:08</p>
				<p className="fw-600 nametag mt-0 mb-0-5">Good evening, Musk</p>
				<p className="fw-500 focustag my-0">
					What's your main focus for today?
				</p>
				{/* Please note - Only one of the below two will be displayed, added both just for designing UI */}
				<p className="fw-500 mt-2">TODAY</p>
				<p className="my-0 fs-1-5 fw-600">Finish UI</p>
				<input type="text" className="fw-500 name-text focus-text" />
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
