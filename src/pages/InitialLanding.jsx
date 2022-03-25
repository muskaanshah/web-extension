import "./landingpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function InitialLanding() {
	const [alreadyExistingUser, setExistingUser] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		const user = localStorage.getItem("name");
		setExistingUser(user);
	}, []);

	const navigate = useNavigate();
	const inputHandler = (e) => {
		setName(e.target.value);
		localStorage.setItem("name", e.target.value);
	};
	alreadyExistingUser && navigate("/landing");
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="fw-600 nametag mb-1-25">Hello, what's your name?</p>
				<input
					type="text"
					className="fw-500 input-text name-text"
					value={name}
					onChange={(e) => inputHandler(e)}
					onKeyPress={(e) => e.key === "Enter" && navigate("/landing")}
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
