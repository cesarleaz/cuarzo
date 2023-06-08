export class Transform {
  constructor({ x = 0, y = 0 } = {}, rotate = 0) {
    this.scale = { x, y }
    this.rotate = rotate
  }
}
