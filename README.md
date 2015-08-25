# Hire Faceted Search (eLaborate version)

A faceted search React component.

## Example

	let config = {
		baseURL: "",
		levels: []
	}

	let facetList = [
		"Label 1",
		"Label 2",
		...
	]

	let labels = {
		newSearch: "Searchio neubo",
		resultsFound: "Fundacio resultatas",
		...
	}

	<FacetedSearch
		config={config}
		facetList={facetList}
		labels={labels}
		onChange={(result, query) => console.log(result, query)}
		onSelect={(item) => console.log(item)} />