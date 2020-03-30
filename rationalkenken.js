/**
 * Created by Nathan Lipiarski copyright 2019
 *
 * Rational KenKen is a variant of KenKen in which the player fills in a square
 * grid with fractions such that the fractions in each region add, multiply,
 * subtract, or divide to be a given number.
 */

"use strict";
(function () {

	window.onload = setup;

	let grid;

	/** Sets up event handlers for changing grid size, clearing the grid, and
	 * checking the solution.
	 */
	function setup() {
		createGrid();
		$("grid-size").onchange = createGrid;
		$("new-grid").onclick = createGrid;
		$("clear-grid").onclick = clearGrid;
		$("validate").onclick = validate;
	}

	/** Displays a new grid that is the size given by the dropdown menu
	 * below the grid.
	 */
	function createGrid() {
		let size = parseInt($("grid-size").value, 10);
		if (size <= 1) {
			alert("Grid size must be at least 2");
			return;
		}
		grid = new Grid(size);
		let tableHolder = $("gridHolder");

		tableHolder.innerHTML = "";
		tableHolder.appendChild(grid.getElement());
		tableHolder.classList.remove("hidden");
	}

	/** Checks to see if the grid is valid.
	 */
	function validate() {
		if (grid.validate()) {
			// Use setTimeout to stop the alert from blocking the redraw of the
			// grid colors
			setTimeout(function (){
				alert("Good Work! You solved it!");
			}, 0);
		}
	}

	/** Removes all entries from the grid.
	 */
	function clearGrid() {
		grid.clear();
	}

	function $(element) {
		return document.getElementById(element);
	}
})();