import { useEffect, useState } from "react";
import axios from "axios";

const APIKEY = "40d6f448e392001b5598241621cd7b46";

function Weather() {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState(0);
	const [cityValueInput, setCityValueInput] = useState("");
	const [cityValue, setCityValue] = useState("");

	useEffect(() => {
		getGeoLocation();
	}, [cityValue]);

	const weatherAPI = async (lat, lon) => {
		let API = "";
		cityValue.length <= 0
			? (API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}`)
			: (API = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKEY}`);
		try {
			const res = await axios.get(API);
			console.log(res);
			setCity(res.data.name);
			setTemperature(Math.round(res.data.main.temp - 273.15));
		} catch (err) {
			console.error(err);
		}
	};
	const success = (pos) => {
		const crd = pos.coords;
		weatherAPI(crd.latitude, crd.longitude);
	};
	const error = (err) => {
		console.error(err);
	};
	const getGeoLocation = () => {
		navigator.geolocation.getCurrentPosition(success, error);
	};
	return (
		<div className="weather-top-right">
			<div className="temperature-display">
				<p className="fs-1-25 fw-500 mb-0">{temperature}°</p>
				<p className="fs-0-8 my-0">{city}</p>
			</div>
			<label className="city-input-label">
				<span className="material-icons-outlined pr-0-5">travel_explore</span>
				<input
					type="text"
					className="city-input"
					onChange={(e) => setCityValueInput(e.target.value)}
					value={cityValueInput}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							setCityValue(() => cityValueInput);
							setCityValueInput("");
						}
					}}
				/>
			</label>
		</div>
	);
}

export { Weather };
