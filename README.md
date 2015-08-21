# Hire Faceted Search

A faceted search React component.

## Example

	let config = {
		baseURL: "",
		levels: []
	}

	<FacetedSearch
		config={config}
		onChange={(item) => console.log(item)} />


## Timbuctoo configuration sample



```javascript
import React from "react";
import FacetedSearch from "hire-faceted-search";


// Remap result set metadata FROM:
// {title: "title", metadataKey: "metadata value"}
// TO:
// {name: "title", metadata: {metadataKey: "metadata value"}}
function mapMD(data) {
	let md = {};
	for(let key in data) {
		if(!key.match(/^[\^_@]/) && data[key] && typeof data[key] === "string") {
			md[key] = data[key];
		}
	}
	return md;
}

// Remap facets FROM:
// {facets: null}
// TO:
// {facets: []}
// AND FROM:
// {facets: [{name: "facet_name"}]}
// TO:
// {facets: [{title: "facet_name"}]}
function mapFacets(data) {
	let facets = data || [];
	for(let i in facets) {
		facets[i].title = facets[i].name;
	}
	return facets;
}

// Remap results
function mapDocuments(data) {
	for(let i in data.results) {
		data.results[i].name = data.results[i].title;
		data.results[i].metadata = mapMD(data.results[i]);
	}
	data.facets = mapFacets(data.facets);
}

let config = {
	// Base URL
	baseURL: "https://acc.repository.huygens.knaw.nl/",
	// API path
	searchPath: "v2/search/wwdocuments",
	// Override the query defaults for eLaborate API
	useMapping: {facetValues: []},
	// Do not request resultfields like in eLaborate
	resultFields: [],
	// Same as in eLaborate
	levels: ["dynamic_sort_creator", "dynamic_sort_title"],
	// Provide a VRE ID for headers
	vre: "WomenWriters",
	// Provide a mapping function to remap result set to what hire-faceted-search expects
	resultMapFunc: mapDocuments
};

React.render(<FacetedSearch config={config} onChange={(item) => console.log(item)} />, document.body);
```