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
 * @property {string} [Properties.shapeType='rect'] - The shape type for collision detection.
 * @property {Vector2} [Properties.position] - The position of the collision shape.
 * @property {Vector2} [Properties.size] - The size of the collision shape.
 * @property {number} [Properties.center] - The center of the circular collision shape.
 * @property {number} [Properties.radius] - The radius of the circular collision shape.
 * @property {Vector2[]} [Properties.vertices] - The vertices of the polygonal collision shape.
 * @property {Vector2} [Prstartoperties.start] - The starting point of the segment collision shape.
 * @property {Vector2} [Properties.end] - The ending point of the segment collision shape.
 * @property {string} [Properties.colorDeteccion] - The color used for collision detection visualization.
 */

// Dictionary of compatible collision shapes with their corresponding detection functions
const compatibleShapes = {
  rect: detectRectangleCollision,
  cir: detectCircleCollision,
  seg: detectSegmentCollision,
  poly: detectPolygonCollision
}

export class Collision extends Node2D {
  /**
   * Creates an instance of Collision.
   * @param {string} name - The name of the collision.
   * @param {Properties} [param2] - The collision properties.
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
     * @type {boolean} - The state of the last collision.
     */
    this._isCollision = false

    if (shapeType === 'rect') {
      this.position = position
      this.size = size
      return
    }
    if (shapeType === 'cir') {
      this.center = center
      this.radius = radius
      this.position = position
      return
    }
    if (shapeType === 'poly') {
      this.vertices = vertices
      this.position = position
      this.size = size
      return
    }
    if (shapeType === 'seg') {
      this.start = start
      this.end = end
      return
    }

    throw new Error('Invalid shapeType provided.')
  }

  /**
   * Updates the collision state.
   */
  _update() {
    // Get all components with collisions
    const collisions = Cuarzo.getCollisions()

    for (const collider of collisions) {
      // Check if the collider is the same or is inactive
      if (
        collider.name === this.name ||
        !collider._active ||
        !collider.parent?._active
      )
        continue

      // Check collision with the current collider
      this.checkCollision(collider)
    }

    if (Cuarzo.config.devMode) {
      this.detectionDraw()
    }
  }

  /**
   * Checks collision with another collider.
   * @param {Collision} otherCollider - The other collider to check collision with.
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

  /**
   * Draws the collision detection visualization.
   */
  detectionDraw() {
    // Cuarzo.ctx.fillStyle = ref.bg
    // Cuarzo.ctx.fillRect(ref.x, ref.y, ref.w, ref.h)
  }
}

/**
 * Generates a random number.
 * @param {number} n - The upper limit for the random number.
 * @returns {string} - The generated random number.
 */
function generateNumber(n) {
  return (Math.random() * n).toFixed(0)
}

/**
 * Generates a random color for collision detection visualization.
 * @returns {string} - The generated random color.
 */
function randomColorDetection() {
  const r = generateNumber(255)
  const g = generateNumber(255)
  const b = generateNumber(255)

  return `rgb(${r}, ${g}, ${b}, .65)`
}

/**
 * Shares collision properties with a node and creates the corresponding collision components.
 * @param {Node2D} node - The node to share collision properties with.
 * @param  {...Properties} properties - The collision properties.
 */
export function CollisionShare(node, ...properties) {
  const randomColor = randomColorDetection()

  properties.forEach(
    ({ shapeType, colorDeteccion = randomColor, ...shapeProperties }) => {
      const collision = new Collision(node.name, {
        shapeType,
        colorDeteccion,
        ...shapeProperties
      })

      node.addComponent(collision)
      Cuarzo.collisions.push(collision)
    }
  )
}
