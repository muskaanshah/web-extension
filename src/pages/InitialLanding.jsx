import "./landingpage.css";
import { useState } from "react";

function InitialLanding() {
	const [name, setName] = useState("");
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="fw-600 nametag mb-1-25">Hello, what's your name?</p>
				<input
					type="text"
					className="fw-500 input-text name-text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							localStorage.setItem("name", name);
							window.location.reload(false);
						}
					}}
					autoComplete="off"
				/>
				{name.length > 0 && (
					<button
						className="btn bg-white borderradius-2"
						onClick={() => {
							localStorage.setItem("name", name);
							window.location.reload(false);
						}}
					>
						<span>Continue ›</span>
					</button>
				)}
			</div>
		</div>
	);
}

export { InitialLanding };
