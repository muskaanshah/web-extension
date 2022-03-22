import "./landingpage.css";
import { Link } from "react-router-dom";

function InitialLanding() {
	return (
		<div className="landingimage overlay-wrapper">
			<div className="overlay">
				<p className="fw-600 nametag mb-1">Hello, what's your name?</p>
				<input type="text" className="fw-500 input-text name-text" />
				<Link to="/landing" className="btn bg-white borderradius-2">
					<span>Continue ›</span>
				</Link>
			</div>
		</div>
	);
}

export { InitialLanding };
