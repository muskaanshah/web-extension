import "./landingpage.css";
import "./loader.css";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { Countdown } from "../components/countdown/Countdown";
import { TimeDisplay } from "../components/TimeDisplay/TimeDisplay";
import { TodoWrapper } from "../components/Todo/TodoWrapper";
import { Settings } from "../components/Settings/Settings";

function Landing() {
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<TimeDisplay />
				<Focus />
				<Settings />
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
