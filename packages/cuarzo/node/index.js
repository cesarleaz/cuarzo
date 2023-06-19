// @ts-check
import { Vector2 } from '../geometry/vector2'
import { camera } from '../core/camera'

/** @typedef {import('../sprite').SpriteSheet} SpriteSheet */

/**
 * Class representing a node in a 2D space.
 */
export class Node2D {
  /**
   * Creates an instance of the Node2D class.
   * @param {string} name - The name of the node.
   * @param {Object} options - Options to configure the node.
   * @param {Vector2} [options.position=new Vector2()] - The position of the node in 2D space.
   * @param {Vector2} [options.scale=new Vector2()] - The scale of the node.
   * @param {number} [options.rotation=0] - The rotation of the node in radians.
   * @param {Function} [options.onReady=() => {}] - Function called when the node is ready.
   * @param {Function} [options.onUpdate=() => {}] - Function called on each update of the node.
   * @param {Object} [options.properties] - Other properties of the node.
   */
  constructor(
    name,
    {
      position = new Vector2(),
      scale = new Vector2(1, 1),
      rotation = 0,
      onReady = () => {},
      onUpdate = () => {},
      ...properties
    } = {}
  ) {
    /**
     * @type {boolean}
     */
    this._active = true

    /**
     * The name of the node.
     * @type {string}
     */
    this.name = name

    /**
     * The position of the node in 2D space.
     * @type {Vector2}
     */
    this.position = position

    /**
     * The rotation of the node in radians.
     * @type {number}
     */
    this.rotation = rotation

    /**
     * The scale of the node.
     * @type {Vector2}
     */
    this.scale = scale

    /**
     * Function called when the node is ready.
     * @type {Function}
     */
    this.onReady = onReady

    /**
     * Function called on each update of the node.
     * @type {Function}
     */
    this.onUpdate = onUpdate

    /**
     * The components of the node.
     * @type {Node2D[]}
     */
    this.components = []

    /**
     * The parent of the node.
     * @type {Node2D | null}
     */
    this.parent = null

    /**
     * The sprites of the node.
     * @type {Object.<string, SpriteSheet>}
     */
    this.sprites = {}

    /**
     * The animated sprite of the node.
     * @type {Object.<string, function>}
     */
    this.animator = {}

    Object.assign(this, properties)
  }

  /**
   * Adds a node as a child of this node.
   * @param {Node2D} node - The node to be added as a child.
   */
  addComponent(node) {
    node.parent = this
    this.components.push(node)
  }

  /**
   * Removes a child node from this node.
   * @param {Node2D} node - The node to be removed.
   */
  removeComponent(node) {
    const index = this.components.indexOf(node)
    if (index !== -1) {
      this.components.splice(index, 1)
      node.parent = null
    }
  }

  /**
   * Updates the node and all its components.
   * @param {number} delta - The time elapsed since the last update in seconds.
   */
  _update(delta) {
    if (!this._active) return
    if (typeof this.onUpdate === 'function') this.onUpdate(delta)

    for (const child of this.components) {
      child._update(delta)
    }
  }

  /**
   * Calls the onReady function of the node and all its components recursively.
   * @param {number} delta - The time elapsed since the last update in seconds.
   */
  _ready(delta) {
    if (!this._active) return
    if (typeof this.onReady === 'function') this.onReady(delta)

    for (const child of this.components) {
      child._ready(delta)
    }
  }

  /**
   * Get the absolute position of the node by summing up the relative position to the parent node.
   * @returns {Vector2} The absolute position of the node.
   */
  getAbsolutePosition() {
    const currentPosition = this.position
    const parentNode = this.parent

    if (parentNode !== null) {
      const position = parentNode.getAbsolutePosition()
      return new Vector2(
        position.x + currentPosition.x,
        position.y + currentPosition.y
      )
    }

    return currentPosition
  }

  /**
   * Checks if the node is inside the camera frustum.
   * @returns {boolean} True if the node is inside the camera frustum, false otherwise.
   */
  isInCameraFrustum() {
    const absolutePosition = this.getAbsolutePosition()
    const frustum = camera.getFrustum()

    if (
      absolutePosition.x >= frustum.left &&
      absolutePosition.x <= frustum.right &&
      absolutePosition.y >= frustum.bottom &&
      absolutePosition.y <= frustum.top
    ) {
      return true
    }

    return false
  }

  /**
   *
   * @param {Node2D} node
   */
  onCollisionStart(node) {}

  /**
   *
   * @param {Node2D} node
   */
  onCollisionEnd(node) {}

  /**
   *
   * @param {Node2D} node
   */
  onCollision(node) {}
}
