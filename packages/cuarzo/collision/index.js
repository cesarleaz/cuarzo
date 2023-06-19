// @ts-check
import { Cuarzo } from '../core'
import { Vector2 } from '../geometry/vector2'
import { Node2D } from '../node'
import { detectCircleCollision } from '../internals/collisions/circleCollision'
import { detectPolygonCollision } from '../internals/collisions/polygonCollision'
import { detectRectangleCollision } from '../internals/collisions/rectangleCollision'
import { detectSegmentCollision } from '../internals/collisions/segmentCollision'

/**
 * @typedef {Object} Properties
 * @property {string} [Properties.shapeType='rect']
 * @property {Vector2} [Properties.position]
 * @property {Vector2} [Properties.size]
 * @property {number} [Properties.center]
 * @property {number} [Properties.radius]
 * @property {Vector2[]} [Properties.vertices]
 * @property {Vector2} [Prstartoperties.start]
 * @property {Vector2} [Properties.end]
 * @property {string} [Properties.colorDeteccion]
 *
 */

const compatibleShapes = {
  rect: detectRectangleCollision,
  cir: detectCircleCollision,
  seg: detectSegmentCollision,
  poly: detectPolygonCollision
}

export class Collision extends Node2D {
  /**
   *
   * @param {string} name
   * @param {Properties} param2
   */
  constructor(
    name,
    {
      shapeType = 'rect',
      position = new Vector2(),
      size = new Vector2(),
      center = 50,
      radius = 50,
      vertices = [new Vector2(), new Vector2(), new Vector2()],
      start = new Vector2(),
      end = new Vector2(),
      colorDeteccion
    } = {}
  ) {
    super(name)
    this.shapeType = shapeType
    this.colorDeteccion = colorDeteccion
    /**
     * @type {boolean} - state last of collision
     */
    this._isCollision = false

    if (shapeType === 'rect') {
      this.position = position
      this.size = size
    }
    if (shapeType === 'cir') {
      this.center = center
      this.radius = radius
      this.position = position
    }
    if (shapeType === 'poly') {
      this.vertices = vertices
      this.position = position
      this.size = size
    }
    if (shapeType === 'seg') {
      this.start = start
      this.end = end
    }

    throw new Error()
  }

  _update() {
    const componentsWithCollisions = Cuarzo.getCollisionsComponents()

    for (const collider of componentsWithCollisions) {
      if (
        collider.name === this.name ||
        !collider._active ||
        !collider.parent?._active
      )
        continue
      this.checkCollision(collider)
    }

    if (Cuarzo.config.devMode) {
      this.detectionDraw()
    }
  }

  /**
   *
   * @param {Collision} otherCollider
   */
  checkCollision(otherCollider) {
    /**
     * @type {boolean}
     */
    const collisionExists = compatibleShapes[otherCollider.shapeType](
      this,
      otherCollider
    )

    if (collisionExists && !this._isCollision) {
      // @ts-expect-error
      this.parent.onCollisionStart(otherCollider.parent)
      this._isCollision = true
    }

    if (collisionExists) {
      // @ts-expect-error
      this.parent.onCollision(otherCollider.parent)
    }

    if (!collisionExists && this._isCollision) {
      // @ts-expect-error
      this.parent.onCollisionEnd(otherCollider.parent)
      this._isCollision = false
    }
  }

  detectionDraw() {
    // Cuarzo.ctx.fillStyle = ref.bg
    // Cuarzo.ctx.fillRect(ref.x, ref.y, ref.w, ref.h)
  }
}

function genetateNumber(n) {
  return (Math.random() * n).toFixed(0)
}

function randomColorDeteccion() {
  const r = genetateNumber(255)
  const g = genetateNumber(255)
  const b = genetateNumber(255)

  return `rgb(${r}, ${g}, ${b}, .65)`
}

/**
 *
 * @param {Node2D} node
 * @param  {...Properties} properties
 */
export function CollisionShare(node, ...properties) {
  const randomColor = randomColorDeteccion()

  properties.forEach(
    ({ shapeType, colorDeteccion = randomColor, ...shapeProperties }) => {
      const collision = new Collision(node.name, {
        shapeType,
        colorDeteccion,
        ...shapeProperties
      })

      node.addComponent(collision)
    }
  )

  Cuarzo.collisions.push(node)
}
