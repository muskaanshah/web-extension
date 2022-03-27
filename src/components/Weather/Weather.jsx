import { useEffect, useState } from "react";
import axios from "axios";

const APIKEY = "40d6f448e392001b5598241621cd7b46";

function Weather() {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState(0);
	const [cityValueInput, setCityValueInput] = useState("");
	const [cityValue, setCityValue] = useState("");
	const [weatherIcon, setWeatherIcon] = useState("");
	const [weatherModal, setWeatherModal] = useState(false);
	const [loader, setLoader] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");

	const weatherAPI = async (lat, lon) => {
		let API = "";
		cityValue.length <= 0
			? lat === undefined || lon === undefined
				? (API = `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${APIKEY}`)
				: (API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}`)
			: (API = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKEY}`);
		setLoader(true);
		try {
			const res = await axios.get(API);
			setWeatherIcon(res.data.weather[0].icon);
			setCity(res.data.name);
			setTemperature(Math.round(res.data.main.temp - 273.15));
			setLoader(false);
			setErrorMsg(() => "");
		} catch (err) {
			setErrorMsg(() => "Not found");
			setLoader(false);
		}
	};
	const success = (pos) => {
		const crd = pos.coords;
		weatherAPI(crd.latitude, crd.longitude);
	};
	const error = (err) => {
		weatherAPI();
	};
	const getGeoLocation = () => {
		navigator.geolocation.getCurrentPosition(success, error);
	};
	useEffect(() => {
		getGeoLocation();
		const temp = localStorage.getItem("Location");
		setCityValue(temp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cityValue]);
	return (
		<div className="weather-top-right">
			<div className="weather-hover">
				<label className="city-input-label mt-0-5">
					<span className="material-icons-outlined pr-0-5">travel_explore</span>
					<input
						type="text"
						className="small-input"
						onChange={(e) => setCityValueInput(e.target.value)}
						value={cityValueInput}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								localStorage.setItem("Location", cityValueInput);
								setCityValue(() => cityValueInput);
								setCityValueInput("");
							}
						}}
					/>
				</label>
				{loader ? (
					<div className="loader mt-1">Loading...</div>
				) : errorMsg !== "" ? (
					<div className="mt-1">{errorMsg}</div>
				) : (
					<div className="temperature-display">
						<img
							className="weather-icon"
							src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
							alt="weather"
						/>
						<div
							className="temperature"
							onClick={() => setWeatherModal((weatherModal) => !weatherModal)}
						>
							<p className="fs-1-25 fw-500 mb-0">{temperature}°</p>
							<p className="fs-0-8 my-0">{city}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export { Weather };
