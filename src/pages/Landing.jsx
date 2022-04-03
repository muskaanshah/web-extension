import "./landingpage.css";
import "./loader.css";
import { useEffect, useState } from "react";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { Countdown } from "../components/countdown/Countdown";
import { TimeDisplay } from "../components/TimeDisplay/TimeDisplay";
import { TodoWrapper } from "../components/Todo/TodoWrapper";

function Landing() {
	const [settingsModal, setSettingsModal] = useState(false);
	const [userName, setUserName] = useState("");
	const changeNameHandler = () => {
		localStorage.setItem("name", "");
		setSettingsModal((settingsModal) => !settingsModal);
		window.location.reload(false);
	};
	useEffect(() => {
		const user = localStorage.getItem("name");
		setUserName(user);
	}, []);
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<TimeDisplay username={userName} />
				<Focus />
				<div className="settings-hover">
					{settingsModal && (
						<button
							className="btn btn-change-name ml-0"
							onClick={changeNameHandler}
						>
							Change name
						</button>
					)}
					<span
						className="material-icons-outlined"
						onClick={() => setSettingsModal((settingsModal) => !settingsModal)}
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
