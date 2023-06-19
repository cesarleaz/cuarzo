import { Vector2 } from '../geometry/vector2'

/**
 * Class representing a camera in the Cuarzo engine.
 */
class Camera {
  /**
   * Creates an instance of Camera.
   * @param {Vector2} [position=new Vector2()] - The initial position of the camera.
   * @param {Vector2} [viewportSize=new Vector2()] - The size of the camera viewport.
   */
  constructor(position = new Vector2(), viewportSize = new Vector2()) {
    /**
     * The position of the camera.
     * @type {Vector2}
     */
    this.position = position

    /**
     * The size of the camera viewport.
     * @type {Vector2}
     */
    this.viewportSize = viewportSize
  }

  /**
   * Gets the current position of the camera.
   * @returns {Vector2} The position of the camera.
   */
  getPosition() {
    return this.position
  }

  /**
   * Sets the position of the camera.
   * @param {Vector2} position - The new position of the camera.
   */
  setPosition(position) {
    this.position = position
  }

  /**
   * Gets the size of the camera viewport.
   * @returns {Vector2} The size of the camera viewport.
   */
  getViewportSize() {
    return this.viewportSize
  }

  /**
   * Sets the size of the camera viewport.
   * @param {Vector2} viewportSize - The new size of the camera viewport.
   */
  setViewportSize(viewportSize) {
    this.viewportSize = viewportSize
  }

  /**
   * Gets the frustum of the camera.
   * @returns {Object} An object representing the camera frustum.
   */
  getFrustum() {
    const left = this.position.x - this.viewportSize.x
    const right = this.position.x + this.viewportSize.x
    const bottom = this.position.y - this.viewportSize.y
    const top = this.position.y + this.viewportSize.y

    return { left, right, bottom, top }
  }
}

export const camera = new Camera()
