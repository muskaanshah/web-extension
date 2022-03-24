function GoogleSearch() {
	return (
		<form
			action="https://www.google.com/search"
			className="searchform mt-0-5"
			method="get"
			name="searchform"
			target="_blank"
		>
			<input name="sitesearch" type="hidden" />
			<input
				autocomplete="off"
				className="form-control search small-input sitesearch fs-0-9"
				name="q"
				placeholder="Search"
				type="text"
			/>
			<button className="search-btn" type="submit">
				<span className="material-icons-outlined">search</span>
			</button>
		</form>
	);
}

export { GoogleSearch };
