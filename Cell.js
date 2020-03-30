/** A cell represents a single unit of a board.  It has both an html
 * representation that is the ssquare with the two input boxes as well as an
 * representation as the value of the fraction entered by the user.
 */
function Cell() {
	let element = document.createElement("td");
	let numerator = document.createElement("input");
	numerator.type = "text";
	numerator.classList.add("fraction-input");

	let denominator = document.createElement("input");
	denominator.type = "text";
	denominator.classList.add("fraction-input");

	let slash = document.createElement("div");
	slash.classList.add("slash");

	let label = document.createElement("div");
	label.classList.add("label");
	label.innerHTML = "&nbsp;";

	element.appendChild(label);
	element.appendChild(numerator);
	element.appendChild(slash);
	element.appendChild(denominator);

	this.element = element;
	this.numerator = numerator;
	this.denominator = denominator;
	this.label = label;
}

/** Puts the value of the given fraction as the value in the two input boxes for
 * this cell
 *
 * @param fraction The fraction to show in the cell
 */
Cell.prototype.displayValue = function(fraction) {
	this.numerator.value = fraction.numerator;
	this.denominator.value = fraction.denominator;
}

/** Gives this cell the label label in the top left of the cell
 * @param label The label to display
 */
Cell.prototype.setLabel = function(label) {
	this.label.innerHTML = label;
	this.label.classList.remove("hidden");
}

/** Removes the label from this cell
 */
Cell.prototype.removeLabel = function() {
	this.label.innerHTML = "";
	this.label.classList.add("hidden");
}

/** Draws the right or bottom borders if right or bottom are truthy. These are 
 * the only ones that need to be drawn since border collapse is on.
 * @param right Set to true if you want a right border and false otherwise
 * @param bottom Set to true if you want a bottom border and false otehrwise.
 */
Cell.prototype.drawBorders = function(right, bottom) {

	if (right) {
		this.element.classList.add("right");
	} else {
		this.element.classList.remove("right");
	}

	if (bottom) {
		this.element.classList.add("bottom");
	} else {
		this.element.classList.remove("bottom");
	}
}

/** Returns a fraction object representing the values entered by the user.  Also,
 * validates this input and updates the display to show the values interpreted 
 * by the conversion process.  E.G. "10g" would be rewritten as "10"
 *
 * @return A fraction representing the current value of this cell
 */
Cell.prototype.getFraction = function() {
	let numerator = parseInt(this.numerator.value, 10);
	if (!isNaN(numerator)) {
		this.numerator.value = numerator;
	} else {
		this.numerator.value = "";
	}

	let denominator = parseInt(this.denominator.value, 10);
	if (!isNaN(denominator)) {
		this.denominator.value = denominator;	
	} else {
		this.denominator.value = "";
	}

	return new Fraction(numerator, denominator);
}

/** Resets any invalid cells. */
Cell.prototype.clearValidity = function() {
	this.valid();
	this.validNumerator();
	this.validDenominator();
}

/** Sets the entire cell to be displayed as valid */
Cell.prototype.valid = function() {
	this.element.classList.remove("invalid");
}

/** Sets the entire cell to be displayed as invalid */
Cell.prototype.invalid = function() {
	this.element.classList.add("invalid");
}

/** Sets the numerator to be displayed as valid */
Cell.prototype.validNumerator = function() {
	this.numerator.classList.remove("invalid");
}

/** Sets the numerator to be displayed as invalid */
Cell.prototype.invalidNumerator = function() {
	this.numerator.classList.add("invalid");
}

/** Sets the denominator to be displayed as valid */
Cell.prototype.validDenominator = function() {
	this.denominator.classList.remove("invalid");
}

/** Sets the denominator to be displayed as invalid */
Cell.prototype.invalidDenominator = function() {
	this.denominator.classList.add("invalid");
}

/** Resets the values of the numerator and the denominator to be empty */
Cell.prototype.clear = function() {
	this.numerator.value = "";
	this.denominator.value = "";
}