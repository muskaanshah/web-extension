import { useState } from "react";
import { v4 as uuid } from "uuid";
import { dateFormat } from "../../utils/dateFormat";

function CountdownModal({
	userEvent,
	setUserEvent,
	today,
	setModalToggle,
	setEventOverModal,
}) {
	const setEventHandler = (e) => {
		e.preventDefault();
		setUserEvent({ description: descriptionHandler, dateByUser: dateHandler });
		setDescriptionHandler("");
		setDateHandler("");
		setEventOverModal(false);
		localStorage.setItem(
			"Event",
			JSON.stringify({
				...userEvent,
				id: uuid(),
				description: descriptionHandler,
				dateByUser: dateHandler,
			})
		);
		setModalToggle(false);
	};
	const [dateHandler, setDateHandler] = useState("");
	const [descriptionHandler, setDescriptionHandler] = useState("");

	return (
		<div className="flex-column centered countdown-modal py-1 mt-0-5">
			<button
				className="btn-todo btn-close-countdownmodal mr-0-5"
				onClick={() => setModalToggle(false)}
			>
				<span className="material-icons-outlined">close</span>
			</button>
			<form onSubmit={setEventHandler}>
				<input
					type="text"
					className="input-text desc-input p-0-5"
					value={descriptionHandler}
					placeholder="Description"
					onChange={(e) => setDescriptionHandler(e.target.value)}
					required
					autoFocus
				/>
				<span className="fs-0-8 display-inlineblock mb-0-5">
					Set date and time of the event
				</span>
				<input
					type="datetime-local"
					className="countdown-date"
					min={dateFormat(today)}
					value={dateFormat(new Date(dateHandler))}
					onChange={(e) => {
						setDateHandler(new Date(e.target.value));
					}}
					required
				/>
				<input
					type="submit"
					value="Create"
					className="btn btn-sm bg-grey-light borderradius-2 mt-1"
				/>
			</form>
		</div>
	);
}

export { CountdownModal };
