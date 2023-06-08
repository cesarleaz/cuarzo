export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  sub(vector) {
    this.x = this.x - vector.x
    this.y = this.y - vector.y
  }

  mult(n) {
    this.x = this.x * n
    this.y = this.y * n
  }

  div(n) {
    this.x = this.x / n
    this.y = this.y / n
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalized() {
    const mag = this.mag()
    if (mag > 0) {
      this.div(mag)
    }
  }
}
