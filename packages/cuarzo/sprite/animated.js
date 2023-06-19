// @ts-check
import { Cuarzo } from '../core'
import { Vector2 } from '../geometry/vector2'
import { Node2D } from '../node'
import { Resources } from '../internals/resources'

/**
 * @typedef {Object} AnimationProperties
 * @property {Vector2} [AnimationProperties.position]
 * @property {Vector2} [AnimationProperties.size]
 */

/**
 * @typedef {{ frames: HTMLImageElement[], fps: number }} FrameData
 * @typedef {string | string[]} ListOfResources
 * @typedef {number | Object.<string, number>} FPSConfig
 */

export class AnimationSprite extends Node2D {
  /**
   *
   * @param {string} key
   * @param {AnimationProperties} param1
   */
  constructor(key, { size = new Vector2(), position }) {
    super(key, { position })
    this.size = size
    this.frame = 0
    this.timer = 0
    /** @type {Map.<string, FrameData>} */
    this.spriteList = new Map()
    this.playing = true
  }

  _update() {
    if (!this.isInCameraFrustum()) return

    const { frames = [], fps = 5 } = this.spriteList.get(this.name) ?? {}

    this.timer++

    if (this.playing && this.timer % fps === 0) {
      this.frame++
    }

    if (this.frame >= frames.length) this.frame = 0

    const texture = frames instanceof Image ? frames : frames[this.frame]

    const currentPosition = this.getAbsolutePosition()

    Cuarzo.ctx?.drawImage(
      texture,
      currentPosition.x,
      currentPosition.y,
      this.size.x,
      this.size.y
    )
  }

  /**
   *
   * @param {string} key
   * @param {ListOfResources} resources
   * @param {number} [fps=5]
   */
  addFrame(key, resources, fps = 5) {
    const frameData = {
      frames: this.getNormalizeFrames(resources),
      fps: Math.floor(100 / fps)
    }

    this.spriteList.set(key, frameData)
  }

  /**
   *
   * @param {ListOfResources} resources
   * @returns {HTMLImageElement[]}
   */
  getNormalizeFrames(resources) {
    return typeof resources === 'string'
      ? [Resources.loadImage(resources)]
      : resources.map(Resources.loadImage)
  }
}

/**
 *
 * @param {Node2D} node
 * @param {Object.<string, ListOfResources>} resources
 * @param {FPSConfig} fpsConfig
 * @param {AnimationProperties} properties
 */
export function AnimatedSprite(node, resources, fpsConfig = {}, properties) {
  const resourcesKeys = Object.keys(resources)
  const animation = new AnimationSprite(resourcesKeys[0], properties)

  let fps

  for (const key of resourcesKeys) {
    if (typeof fpsConfig === 'object') fps = fpsConfig[key]
    else fps = fpsConfig

    animation.addFrame(key, resources[key], fps)

    node.animator[key] = () => {
      animation.name = key
    }
  }

  node.addComponent(animation)
}
