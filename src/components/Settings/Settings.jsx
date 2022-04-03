import { useState } from "react";

function Settings() {
	const [settingsModal, setSettingsModal] = useState(false);
	const changeNameHandler = () => {
		localStorage.setItem("name", "");
		setSettingsModal((settingsModal) => !settingsModal);
		window.location.reload(false);
	};
	return (
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
	);
}

export { Settings };
