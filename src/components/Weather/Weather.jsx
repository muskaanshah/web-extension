import { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";

const APIKEY = "40d6f448e392001b5598241621cd7b46";

function Weather() {
	const [temperature, setTemperature] = useState({
		city: "",
		degrees: 0,
		weatherIcon: "",
		max: 0,
		min: 0,
		feelsLike: 0,
		humidity: 0,
		description: "",
	});
	const [cityValueInput, setCityValueInput] = useState("");
	const temp = localStorage.getItem("Location");
	const [cityValue, setCityValue] = useState(temp || "");
	const [weatherModal, setWeatherModal] = useState(false);
	const [loader, setLoader] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");

	const getAPI = (lat, lon) => {
		let API = "";
		if (cityValue === "") {
			if (lat === undefined || lon === undefined)
				API = `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${APIKEY}`;
			else
				API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}`;
		} else
			API = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKEY}`;
		return API;
	};

	const weatherAPI = async (lat, lon) => {
		const API = getAPI(lat, lon);
		try {
			const res = await axios.get(API);
			setTemperature({
				city: res.data.name,
				degrees: Math.round(res.data.main.temp - 273.15),
				weatherIcon: res.data.weather[0].icon,
				max: Math.round(res.data.main.temp_max - 273.15),
				min: Math.round(res.data.main.temp_min - 273.15),
				humidity: res.data.main.humidity,
				feelsLike: Math.round(res.data.main.feels_like - 273.15),
				description: res.data.weather[0].description,
			});
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
					<div
						className="temperature-display"
						onClick={() => setWeatherModal((weatherModal) => !weatherModal)}
					>
						<img
							className="weather-icon"
							src={`http://openweathermap.org/img/wn/${temperature.weatherIcon}.png`}
							alt="weather"
						/>
						<div className="temperature">
							<p className="fs-1-25 fw-500 mb-0">{temperature.degrees}°</p>
							<p className="fs-0-8 my-0">{temperature.city}</p>
						</div>
					</div>
				)}
			</div>
			{weatherModal && (
				<div className="weather-modal">
					<p className="mb-0-5 pl-0-5">{temperature.city}</p>
					<p className="my-0 fs-0-9 text-light pl-0-5">
						{temperature.description}
					</p>
					<div className="temperature-display mt-1 pl-0-5">
						<img
							className="weather-icon my-0"
							src={`http://openweathermap.org/img/wn/${temperature.weatherIcon}.png`}
							alt="weather"
						/>
						<p className="temperature-big my-0">{temperature.degrees}°</p>
						<div className="maxmin ml-0-5 my-0">
							<p className="my-0 text-light">Max: {temperature.max}°</p>
							<p className="mb-1 text-light">Min: {temperature.min}°</p>
						</div>
					</div>
					<p className="fs-0-8 pl-0-5">Feels like: {temperature.feelsLike}°</p>
					<p className="fs-0-8 pl-0-5">Humidity: {temperature.humidity}</p>
				</div>
			)}
		</div>
	);
}

export { Weather };
