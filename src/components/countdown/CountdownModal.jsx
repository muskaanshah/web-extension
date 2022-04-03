import { useState } from "react";
import { v4 as uuid } from "uuid";
import { dateFormat } from "./dateFormat";

function CountdownModal({ userEvent, setUserEvent, today }) {
	const setEventHandler = () => {
		setUserEvent({ description: descriptionHandler, dateByUser: dateHandler });
		setDescriptionHandler("");
		setDateHandler("");
		localStorage.setItem(
			"Event",
			JSON.stringify({
				...userEvent,
				id: uuid(),
				description: descriptionHandler,
				dateByUser: dateHandler,
			})
		);
	};
	const [dateHandler, setDateHandler] = useState("");
	const [descriptionHandler, setDescriptionHandler] = useState("");
	return (
		<div>
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

export { CountdownModal };
