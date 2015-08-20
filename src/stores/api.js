import xhr from "xhr";

import serverActions from "../actions/server";
import queriesStore from "../stores/queries";
import configStore from "../stores/config";

let postResults = function(receiveFunc) {
	let headers = {
		"Content-Type": "application/json",
	};
	if(configStore.getState().get("vre")) {
		headers.VRE_ID = configStore.getState().get("vre");
	}

	let postOptions = {
		data: JSON.stringify(queriesStore.getState()),
		headers: headers,
		method: "POST",
		url: `${configStore.getState().get("baseURL")}${configStore.getState().get("searchPath") || "api/search"}`
	};

	let postDone = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		let url = `${resp.headers.location}?rows=${configStore.getState().get("rows")}`

		getResults(url, receiveFunc);
	};

	xhr(postOptions, postDone);
}

let getResults = function(url, receiveFunc) {
	let getOptions = {
		headers: {
			"Content-Type": "application/json",
		},
		url: url
	}

	let getDone = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }
		let data = JSON.parse(body);
		if(configStore.getState().get("resultMapFunc")) {
			configStore.getState().get("resultMapFunc")(data);
		}
		serverActions[receiveFunc](data);
	};

	xhr(getOptions, getDone)
}

export default {
	getAllResults() {
		postResults("receiveAllResults");
	},

	getResults() {
		postResults("receiveResults");
	},

	getResultsFromUrl(url) {
		getResults(url, "receiveResults");
	}
};