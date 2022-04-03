import { useEffect, useState } from "react";

import "./countdown.css";
import { CountdownModal } from "./CountdownModal";
import { dateFormat } from "./dateFormat";

function Countdown() {
	const eventFromLocalStorage = !localStorage.getItem("Event")
		? {
				description: "",
				dateByUser: "",
		  }
		: {
				...JSON.parse(localStorage.getItem("Event")),
				dateByUser: dateFormat(
					new Date(JSON.parse(localStorage.getItem("Event")).dateByUser)
				),
		  };
	console.log(eventFromLocalStorage);

	const [userEvent, setUserEvent] = useState(eventFromLocalStorage);
	let [difference, setDifference] = useState("");
	const [today, setDate] = useState(new Date());

	useEffect(() => {
		setInterval(() => {
			setDate(() => new Date());
		}, 1000);
	}, []);

	useEffect(() => {
		const currentDate = new Date(dateFormat(today));
		const diffInDays = Math.floor(
			(new Date(userEvent.dateByUser) - currentDate) / (1000 * 60 * 60 * 24)
		);
		const diffInHours = Math.floor(
			(new Date(userEvent.dateByUser) - currentDate) / (1000 * 60 * 60)
		);
		const diffInMinutes = Math.floor(
			(new Date(userEvent.dateByUser) - currentDate) / (1000 * 60)
		);
		if (diffInDays >= 1) {
			setDifference(`${diffInDays}d`);
		} else if (diffInHours >= 1) {
			setDifference(`${diffInHours}h`);
		} else if (diffInMinutes > 0) {
			setDifference(`${diffInMinutes}m`);
		} else if (diffInMinutes <= 0) {
			localStorage.removeItem("Event");
			setUserEvent({
				description: "",
				dateByUser: "",
			});
			setDifference("");
		}
	}, [userEvent.dateByUser, today]);

	return (
		<div className="countdown">
			<p className="fs-1-25 fw-500 mb-0">{difference}</p>
			<p className="fs-0-8 my-0">{userEvent.description}</p>
			<CountdownModal
				userEvent={userEvent}
				setUserEvent={setUserEvent}
				today={today}
			/>
		</div>
	);
}

export { Countdown };
