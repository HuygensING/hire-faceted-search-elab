/* TODO Remove sort menu and move sort options (count/alpha) to facet schema.
	A schema is needed, because different facets, should be able to have different
	options set. */

import React from "react";
import cx from "classnames";

import SortCountAscendingIcon from "../icons/sort-count-ascending";
import SortCountDescendingIcon from "../icons/sort-count-descending";
import SortAlphabeticallyAscendingIcon from "../icons/sort-alphabetically-ascending";
import SortAlphabeticallyDescendingIcon from "../icons/sort-alphabetically-descending";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class SortMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alpha: "asc",
			count: "desc",
			current: "count"
		}
	}

	/*
	 * Change the sort based on type (alpha|count) clicked and current state.
	 *
	 * If the active sort type is clicked, the direction (asc|desc) is changed.
	 * If the inactive sort type is clicked, the type (alpha|count) is set to current, the dir (asc|desc) does not change.
	 *
	 * @param {String} type Type of sorting: "alpha" or "count"
	 */
	changeSort(type) {
		let dir = (this.state.current != type) ?
			this.state[type].charAt(0).toUpperCase() + this.state[type].substr(1) :
			(this.state[type] === "asc") ?
				"Desc":
				"Asc";

		this.setState({
			current: type,
			[type]: dir.toLowerCase()
		})

		this.props.onChange(type + dir);
	}

	render() {
		let alpha = (this.state.alpha === "asc") ?
			<SortAlphabeticallyAscendingIcon /> :
			<SortAlphabeticallyDescendingIcon />;

		let count = (this.state.count === "asc") ?
			<SortCountAscendingIcon /> :
			<SortCountDescendingIcon />;

		return (
			<ul className="hire-faceted-search-sort-menu">
				<li
					className={cx({
						active: this.state.current === "alpha"
					})}
					onClick={this.changeSort.bind(this, "alpha")}>
					{alpha}
				</li>
				<li
					className={cx({
						active: this.state.current === "count"
					})}
					onClick={this.changeSort.bind(this, "count")}>
					{count}
				</li>
			</ul>
		);
	}
}

SortMenu.sortFunctions = {
	alphaAsc: (valA, valB) => valA.name.localeCompare(valB.name),
	alphaDesc: (valA, valB) => valB.name.localeCompare(valA.name),
	countAsc: (valA, valB) => {
		if (valA.count > valB.count) return 1;
		if (valB.count > valA.count) return -1;
		return 0;
	},
	countDesc: (valA, valB) => {
		if (valA.count > valB.count) return -1;
		if (valB.count > valA.count) return 1;
		return 0;
	}
};

SortMenu.defaultSort = "alphaAsc";

SortMenu.defaultProps = {

};

SortMenu.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default SortMenu;