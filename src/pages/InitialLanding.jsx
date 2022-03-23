import "./landingpage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function InitialLanding() {
	const [name, setName] = useState("");
	const inputHandler = (e) => {
		setName(e.target.value);
		localStorage.setItem("name", e.target.value);
	};
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="fw-600 nametag mb-1">Hello, what's your name?</p>
				<input
					type="text"
					className="fw-500 input-text name-text"
					value={name}
					onChange={(e) => inputHandler(e)}
					autocomplete="off"
				/>
				{name.length > 0 && (
					<Link to="/landing" className="btn bg-white borderradius-2">
						<span>Continue ›</span>
					</Link>
				)}
			</div>
		</div>
	);
}

export { InitialLanding };
