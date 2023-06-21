import { Collision } from '../collision'
import { Vector2 } from '../geometry/vector2'
import { logoEngine } from '../internals/logo'
import { playBrandingVideo } from '../internals/playBrandingVideo'
import { renderLogoImage } from '../internals/renderLogoImage'
import { Resources } from '../internals/resources'
import { camera } from './camera'

/**
 * @typedef {import('../node').Node2D} Node2D
 * @typedef {Object} CuarzoOptions
 * @property {HTMLCanvasElement} canvas - The HTML canvas element to be used.
 * @property {number} width - The width of the canvas.
 * @property {number} height - The height of the canvas.
 * @property {string} imageBrandUrl - The URL of the branding image.
 * @property {HTMLVideoElement} videoElement - The HTML video element for branding.
 */

/**
 * The main engine class.
 */
class Engine {
  /**
   * Creates an instance of the Engine class.
   */
  constructor() {
    this.lastTime
    /** @type {Node2D[]} */
    this.collisions = []
    /** @type {Node2D[]} */
    this.nodes = []
    this.paused = false
    this.config = {
      devMode: import.meta['env']?.DEV
    }
  }

  /**
   * Register a listener for resource loading completion.
   * @param {function} listener - The listener function to be executed when resources are loaded.
   */
  onLoaded(listener) {
    if (typeof listener !== 'function')
      throw new Error('Invalid listener. Expected a function.')
    Resources.asignListener(listener)
    Resources.executeListener()
  }

  /**
   * Mounts nodes to the engine and starts the game loop.
   * @param {Node2D[]} nodes - The nodes to be mounted.
   */
  mount(nodes) {
    this.nodes = this.nodes.concat(nodes)
    window.requestAnimationFrame(this._start.bind(this))
  }

  /**
   * Initializes the engine and sets up the canvas.
   * @param {CuarzoOptions} options - The initialization options.
   */
  init({
    canvas = document.querySelector('canvas'),
    width = 600,
    height = 800,
    imageBrandUrl,
    videoElement
  } = {}) {
    if (!(canvas instanceof HTMLCanvasElement))
      throw new Error(
        "The 'canvas' parameter must be an instance of HTMLCanvasElement."
      )

    this.canvas = canvas
    canvas.width = width
    canvas.height = height
    camera.setViewportSize(new Vector2(width, height))
    this.ctx = canvas.getContext('2d')

    document.body.style.background = 'black'

    /**
     * Shows the engine logo.
     */
    function showLogoEngine() {
      renderLogoImage(logoEngine, Resources.executeListener.bind(this))
      document.body.style.removeProperty('background')
    }

    if (typeof imageBrandUrl === 'string')
      return renderLogoImage(imageBrandUrl, showLogoEngine)

    if (typeof videoElement !== 'undefined') {
      if (!(videoElement instanceof HTMLVideoElement))
        throw new Error(
          "The 'videoElement' parameter must be an instance of HTMLVideoElement."
        )
      return playBrandingVideo(videoElement, showLogoEngine)
    }

    showLogoEngine()
  }

  /**
   * Clears the canvas.
   */
  clear() {
    if (this.ctx === undefined) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * The game loop function.
   * @param {number} time - The current time.
   * @private
   */
  _gameLoop(time) {
    this.clear()
    const delta = time - this.lastTime

    for (const node of this.nodes) {
      node._update(delta)
    }

    this.lastTime = time
    window.requestAnimationFrame(this._gameLoop.bind(this))
  }

  /**
   * Starts the game loop.
   * @param {number} delta - The time delta.
   * @private
   */
  _start(delta) {
    for (const node of this.nodes) {
      node._ready(delta)
    }

    this.lastTime = delta
    window.requestAnimationFrame(this._gameLoop.bind(this))
  }

  /**
   * Retrieves the collision components from nodes.
   * @returns {Collision[]} - The collision components.
   */
  getCollisions() {
    return this.collisions
  }
}

/**
 * The main engine instance.
 */
export const Cuarzo = new Engine()
