import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import "./countdown.css";

function Countdown() {
	const dateFormat = (newDate) => {
		const month = newDate.getMonth() + 1;
		const actualMonth = month / 10 < 1 ? `0${month}` : month;
		const day = newDate.getDate();
		const actualDay = day / 10 < 1 ? `0${day}` : day;
		const year = newDate.getFullYear();
		const hour = newDate.getHours();
		const actualHour = hour / 10 < 1 ? `0${hour}` : hour;
		const minute = newDate.getMinutes();
		const actualMinute = minute / 10 < 1 ? `0${minute}` : minute;
		return `${year}-${actualMonth}-${actualDay}T${actualHour}:${actualMinute}`;
	};
	const eventFromLocalStorage = !localStorage.getItem("Event")
		? {
				id: uuid(),
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
	const [dateHandler, setDateHandler] = useState("");
	const [descriptionHandler, setDescriptionHandler] = useState("");
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
		}
	}, [userEvent.dateByUser, today]);

	const setEventHandler = () => {
		setUserEvent({ description: descriptionHandler, dateByUser: dateHandler });
		setDescriptionHandler("");
		setDateHandler("");
		localStorage.setItem(
			"Event",
			JSON.stringify({
				...userEvent,
				description: descriptionHandler,
				dateByUser: dateHandler,
			})
		);
	};
	return (
		<div className="countdown">
			<p className="fs-1-25 fw-500 mb-0">{difference}</p>
			<p className="fs-0-8 my-0">{userEvent.description}</p>
			<input
				type="text"
				className="input-text desc-input p-0-5"
				value={descriptionHandler}
				placeholder="Description"
				onChange={(e) => setDescriptionHandler(e.target.value)}
			/>
			<input
				type="datetime-local"
				className="countdown-date"
				min={dateFormat(today)}
				value={dateFormat(new Date(dateHandler))}
				onChange={(e) => {
					const a = new Date(e.target.value);
					setDateHandler(a);
				}}
			/>
			<button
				className="btn btn-sm bg-grey-light borderradius-2"
				onClick={setEventHandler}
			>
				Create
			</button>
		</div>
	);
}

export { Countdown };
