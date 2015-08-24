
let updateFacetsWithReceivedCounts = function(initFacets, receivedFacets) {
	receivedFacets = receivedFacets.reduce((prev, current) => {
		prev[current.name] = current;

		return prev;
	}, {});

	return initFacets.map((facet) => {
		let options = facet.options.map((option) => {
			let count = 0;

			if (receivedFacets.hasOwnProperty(facet.name)) {
				let found = receivedFacets[facet.name].options.filter((receivedOption) =>
					option.name === receivedOption.name
				);

				if (found.length) {
					count = found[0].count;
				}
			}

			option.count = count;

			return option;
		});

		return {...facet, ...{options: options}};
	});
};

let addResponseToState = function(state, response) {
	return {...state, ...{
		all: [...state.all, response],
		last: response,
		requesting: false
	}};
};

let initialState = {
	all: [],
	facets: {},
	first: null,
	last: null,
	requesting: false
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "REQUEST_RESULTS":
			return {...state, ...{requesting: true}};

		case "RECEIVE_RESULTS":
			if (state.last == null) {
				return {...addResponseToState(state, action.response), ...{first: action.response}};
			}

			let response = {...action.response, ...{
				facets: updateFacetsWithReceivedCounts(
					state.first.facets,
					action.response.facets
				)
			}};

			return addResponseToState(state, response);

		case "RECEIVE_RESULTS_FROM_URL":
			return addResponseToState(state, action.response);

		default:
			return state;
	}
}