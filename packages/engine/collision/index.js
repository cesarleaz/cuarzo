import { Cuarzo } from '../core'
import { Size } from '../geometry/size'
import { getCollisions } from '../lib/collisionHelper'
import { Vector2 } from '../geometry/vector2'

export class Collision {
  constructor(position, size, bg) {
    this.position = new Vector2(position.x, position.y)
    this.size = new Size(size.w, size.h)
    this.bg = bg
  }

  showArea(area2D, i) {
    const ref = getCollisions(area2D, i)
    Cuarzo.ctx.fillStyle = ref.bg
    Cuarzo.ctx.fillRect(ref.x, ref.y, ref.w, ref.h)
  }
}

function randomColorDeteccion() {
  const genetate = (n) => (Math.random() * n).toFixed(0)
  const r = genetate(255)
  const g = genetate(255)
  const b = genetate(255)

  return `rgb(${r}, ${g}, ${b}, .65)`
}

export function CollisionShare(area2D, ...properties) {
  const bg = randomColorDeteccion()
  const { $name: key } = area2D
  if (!Array.isArray(area2D.$collisions)) area2D.$collisions = []
  properties.forEach(({ position = {}, size = {}, bgColor = bg }) => {
    area2D.$collisions.push(new Collision(position, size, bgColor))
  })
  Cuarzo.$collisions[key] = area2D
}
