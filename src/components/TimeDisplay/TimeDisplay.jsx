import { useState, useEffect } from "react";

function TimeDisplay() {
	const [userName, setUserName] = useState("");
	useEffect(() => {
		const user = localStorage.getItem("name");
		setUserName(user);
	}, []);
	const [today, setDate] = useState(new Date());
	const [is24HourFormat, setTo24HourFormat] = useState(true);
	const hour = today.getHours();
	const minute = today.getMinutes();
	const minutes = minute / 10 < 1 ? `0${minute}` : minute;
	const wish = `Good ${
		(hour < 4 && "night") ||
		(hour < 12 && "morning") ||
		(hour < 16 && "afternoon") ||
		(hour < 21 && "evening") ||
		"night"
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
			localStorage.removeItem("Quote");
			localStorage.setItem("setupTime", day);
		}
	}

	useEffect(() => {
		const timeformat = localStorage?.getItem("Timeformat");
		timeformat
			? setTo24HourFormat(JSON.parse(timeformat))
			: localStorage.setItem("Timeformat", is24HourFormat);
	}, [is24HourFormat]);

	useEffect(() => {
		setInterval(() => {
			setDate(() => new Date());
		}, 1000);
	}, []);
	return (
		<>
			<div className="time-hover centered">
				<p className="time-display fw-500 mb-0">
					{is24HourFormat ? time24 : time12}
				</p>
				<button
					className="btn-focusaction btn-time-change centered"
					onClick={() => {
						setTo24HourFormat((prev) => {
							localStorage.setItem("Timeformat", !prev);
							return !prev;
						});
					}}
				>
					<span className="material-icons-outlined">repeat</span>
				</button>
			</div>
			<p className="fw-600 nametag mt-0 mb-1">
				{wish}, {userName}
			</p>
		</>
	);
}

export { TimeDisplay };
