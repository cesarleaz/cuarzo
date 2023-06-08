import { Area2D } from './Area2D.js'
import { Vector2 } from './Vector2.js'

export class KinematicBody2D extends Area2D {
  constructor() {
    super(...arguments)
  }

  moveAndSlide(vector) {
    return Vector2(...vector)
  }
}
