/**
 * Class representing a 2D vector.
 */
export class Vector2 {
  /**
   * Creates a new Vector2 object.
   * @param {number} x - The x value of the vector. Defaults to 0.
   * @param {number} y - The y value of the vector. Defaults to 0.
   */
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  /**
   * Subtracts a given vector from this vector.
   * @param {Vector2} vector - The vector to subtract.
   */
  sub(vector) {
    this.x = this.x - vector.x
    this.y = this.y - vector.y
  }

  /**
   * Multiplies this vector by a given number.
   * @param {number} n - The number to multiply.
   */
  mult(n) {
    this.x = this.x * n
    this.y = this.y * n
  }

  /**
   * Divides this vector by a given number.
   * @param {number} n - The number to divide.
   */
  div(n) {
    this.x = this.x / n
    this.y = this.y / n
  }

  /**
   * Calculates the magnitude or length of this vector.
   * @returns {number} The magnitude of the vector.
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Normalizes this vector, converting it into a unit vector.
   * If the magnitude of the vector is greater than 0, it divides the vector by its magnitude.
   */
  normalized() {
    const mag = this.mag()
    if (mag > 0) {
      this.div(mag)
    }
  }

  /**
   * Calculates the dot product between this vector and another given vector.
   * @param {Vector2} vector - The vector to calculate the dot product with.
   * @returns {number} The dot product between the two vectors.
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  /**
   * Calculates the distance between this vector and another given vector.
   * @param {Vector2} vector - The vector to calculate the distance to.
   * @returns {number} The distance between the two vectors.
   */
  distance(vector) {
    const dx = this.x - vector.x
    const dy = this.y - vector.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  /**
   * Calculates the angle between this vector and another given vector.
   * @param {Vector2} vector - The vector to calculate the angle to.
   * @returns {number} The angle in radians between the two vectors.
   */
  angle(vector) {
    const dot = this.dot(vector)
    const magA = this.mag()
    const magB = vector.mag()
    return Math.acos(dot / (magA * magB))
  }
}
