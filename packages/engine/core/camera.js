let positionX = 0,
  positionY = 0

export class Camara {
  static get x() {
    return positionX
  }
  static get y() {
    return positionY
  }
  static moveToPosition({ x = positionX, y = positionY }) {
    positionX = x
    positionY = y
  }
}
