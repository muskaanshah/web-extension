function GoogleSearch() {
	return (
		<form
			action="https://www.google.com/search"
			className="searchform mt-0-5"
			method="get"
			name="searchform"
		>
			<input name="sitesearch" type="hidden" />
			<input
				autoComplete="off"
				className="form-control search small-input sitesearch fs-0-9"
				name="q"
				placeholder="Google search"
				type="text"
			/>
			<button className="search-btn" type="submit">
				<span className="material-icons-outlined">search</span>
			</button>
		</form>
	);
}

export { GoogleSearch };
