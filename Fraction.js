/** A fraction object is a classic representation of a rational number using a
 * numerator and a denominator. 
 *
 * @param numerator The numerator of the fraction
 * @param denominator The denominator of the fraction
 */
function Fraction(numerator, denominator) {
	this.numerator = numerator;
	this.denominator = denominator;
}

/** Calculates the decimal representation of the fraction
 * @return The decimal value of this
 */
Fraction.prototype.value = function() {
	return this.numerator / this.denominator;
}

/** Classic euclids algorithm for GCD */
Fraction.prototype.gcd = function(a, b) {
	if (isNaN(b) || isNaN(a)) {
		return NaN;
	} else if (b > a) {
		return this.gcd(b, a);
	} else if (b === 0) {
		return a;
	}

	return this.gcd(b, a % b);
}

/** Creates a new fraction that is equal to this but in reduced form
 * @return this but in reduced form
 */
Fraction.prototype.reduce = function() {
	let divisor = this.gcd(this.numerator, this.denominator);
	return new Fraction(this.numerator / divisor, this.denominator / divisor);
}

/** Creates a new fraction that is the result of multiplying this and fraction
 * @param fraction The fraction to multiply this by
 * @return The result of multiplying this by fraction
 */
Fraction.prototype.multiply = function(fraction) {
	let newNumerator = this.numerator * fraction.numerator;
	let newDenominator = this.denominator * fraction.denominator;
	return new Fraction(newNumerator, newDenominator);
}

/** Creates a new fraction that is the result of dividing this by the given
 * fraction.
 * @param fraction The fraction to divide by
 * @return The result of dividing this by fraction
 */
Fraction.prototype.divide = function(fraction) {
	let newNumerator = this.numerator * fraction.denominator;
	let newDenominator = this.denominator * fraction.numerator;
	return new Fraction(newNumerator, newDenominator);
}

/** Creates a new fraction that is the result of adding this and fraction
 * @param fraction The fraction to add to this
 * @return A new fraction that is the result of adding this and fraction
 */
Fraction.prototype.add = function(fraction) {
	let newNumerator = this.numerator * fraction.denominator + 
					   fraction.numerator * this.denominator;
	let newDenominator = this.denominator * fraction.denominator;
	return new Fraction(newNumerator, newDenominator);
}

/** Creates a new fraction that is the result of subtracting fraction from this
 * @param fraction The fraction to subtract from this
 * @return The result of subtracting fraction from this
 */
Fraction.prototype.subtract = function(fraction) {
	let newNumerator = this.numerator * fraction.denominator - 
					   fraction.numerator * this.denominator;
	let newDenominator = this.denominator * fraction.denominator;
	return new Fraction(newNumerator, newDenominator);
}

/** A string representation of this.  If the denominator is 1, then the value of
 * this is displayed as a regular whole number
 * @return the string representation of this as described above
 */
Fraction.prototype.toString = function() {
	if (this.denominator === 1) {
		return this.numerator;
	}

	return this.numerator + "/" + this.denominator;
}

/** Returns if this and other are equivalent fractions and false otherwise
 * @return True if this and other are equivalent and false otherwise.
 */
Fraction.prototype.equals = function(other) {
	let f1 = this.reduce();
	let f2 = other.reduce();

	return (f1.numerator === f2.numerator) && (f1.denominator === f2.denominator);
}