import { SYMBOL_FOR_AREA_2D } from '../core/_symbols'
import { Vector2 } from '../geometry/vector2'
import { Transform } from '../geometry/transform.js'
import { Size } from '../geometry/size'

export class Area2D {
  constructor(name = 'NOT_KNOW', { position, size, transform, ...properties }) {
    Object.assign(this, properties)
    this.position = new Vector2(position?.x, position?.y)
    this.transform = new Transform(transform?.scale, transform?.rotate)
    this.size = new Size(size?.w, size?.h)
    this.$components = new Set()
    this.$typeof = SYMBOL_FOR_AREA_2D
    this.$active = true
    this.$name = name
  }
}
