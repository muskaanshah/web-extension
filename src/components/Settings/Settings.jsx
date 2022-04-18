import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { changeQuoteHandler } from "../Quote/Quote";

function Settings() {
    const [settingsModal, setSettingsModal] = useState(false);
    const changeNameHandler = () => {
        localStorage.setItem("name", "");
        window.location.reload(false);
    };
    const modalRef = useRef();
    const toggleRef = useRef();
    useOnClickOutside(modalRef, toggleRef, () => setSettingsModal(false));
    return (
        <div className="settings-hover">
            {settingsModal && (
                <div className="ml-1 modal-settings borderradius-0-5" ref={modalRef} onClick={() => setSettingsModal(false)}>
                    <span
                        className="btn btn-change-name ml-0"
                        onClick={() => { 
							changeNameHandler();
						}}
                    >
                        Change name
                    </span>
					<div className="divider-black bg-white"></div>
                    <span
                        className="btn btn-change-name ml-0"
                        onClick={() => { 
							changeQuoteHandler();
						}}
                    >
                        Change quote
                    </span>
                </div>
            )}
            <span
                ref={toggleRef}
                className="material-icons-outlined"
                onClick={() =>
                    setSettingsModal(prev => !prev)
                }
            >
                settings
            </span>
        </div>
    );
}

export { Settings };
