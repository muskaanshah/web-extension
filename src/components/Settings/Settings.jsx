import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

function Settings() {
	const [settingsModal, setSettingsModal] = useState(false);
	const changeNameHandler = () => {
		localStorage.setItem("name", "");
		setSettingsModal((settingsModal) => !settingsModal);
		window.location.reload(false);
	};
	const modalRef = { useRef };
	const toggleRef = { useRef };
	useOnClickOutside(modalRef, toggleRef, () => setSettingsModal(false));
	return (
		<div className="settings-hover">
			{settingsModal && (
				<button
					ref={modalRef}
					className="btn btn-change-name ml-0"
					onClick={changeNameHandler}
				>
					Change name
				</button>
			)}
			<span
				ref={toggleRef}
				className="material-icons-outlined"
				onClick={() => setSettingsModal((settingsModal) => !settingsModal)}
			>
				settings
			</span>
		</div>
	);
}

export { Settings };
