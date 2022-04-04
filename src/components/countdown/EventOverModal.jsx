function EventOverModal({ eventName }) {
	return (
		<div className="event-over-modal centered mt-0-5 px-1">
			<span className="material-icons-outlined">notifications_active</span>
			<p>Your event {eventName} is going to start</p>
		</div>
	);
}

export { EventOverModal };
