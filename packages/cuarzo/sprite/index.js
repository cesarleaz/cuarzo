// @ts-check
import { Node2D } from '../node'
import { Cuarzo } from '../core'
import { Vector2 } from '../geometry/vector2'
import { Resources } from '../internals/resources'

/**
 * @typedef {Object} SpriteProperties - Properties to configure the sprite.
 * @property {Vector2} [SpriteProperties.position=new Vector2()] - Properties to configure the sprite.
 * @property {Vector2} [SpriteProperties.scale=new Vector2()] - Properties to configure the sprite.
 * @property {number} [SpriteProperties.rotation=new Vector2()] - Properties to configure the sprite.
 * @property {Vector2} [SpriteProperties.size=new Vector2()] - Properties to configure the sprite.
 * @property {number} [SpriteProperties.vFrame=1] - Properties to configure the sprite.
 * @property {number} [SpriteProperties.hFrame=1] - Properties to configure the sprite.
 * @property {number} [SpriteProperties.frameX=1] - Properties to configure the sprite.
 * @property {number} [SpriteProperties.frameY=1] - Properties to configure the sprite.
 * @property {Vector2} [SpriteProperties.frameCoords=new Vector2()] - Properties to configure the sprite.
 */

export class SpriteSheet extends Node2D {
  /**
   *
   * @param {string} key
   * @param {string} resource - The URL of the image file.
   * @param {SpriteProperties} properties - Properties to configure the sprite.
   */
  constructor(
    key,
    resource,
    {
      position,
      scale,
      rotation,
      size = new Vector2(),
      vFrame = 1,
      hFrame = 1,
      frameX = 1,
      frameY = 1,
      frameCoords = new Vector2()
    }
  ) {
    super(key, { position, scale, rotation })
    this.size = size
    this.image = Resources.loadImage(resource)
    this.vFrame = vFrame
    this.hFrame = hFrame
    this.frameX = frameX
    this.frameY = frameY
    this.frameCoords = frameCoords
  }

  _update() {
    if (
      !(Cuarzo.ctx instanceof CanvasRenderingContext2D) ||
      !this.isInCameraFrustum()
    )
      return

    this.frameCoords.x = (this.image.width / this.vFrame) * this.frameX
    this.frameCoords.y = (this.image.height / this.hFrame) * this.frameY

    const absolutePosition = this.getAbsolutePosition()

    Cuarzo.ctx.save()
    Cuarzo.ctx.rotate(this.rotation)
    Cuarzo.ctx.drawImage(
      this.image,
      this.scale.x,
      this.scale.y,
      this.frameCoords.x,
      this.frameCoords.y,
      absolutePosition.x,
      absolutePosition.y,
      this.size.x,
      this.size.y
    )
    Cuarzo.ctx.restore()
  }
}

/**
 *
 * @param {Node2D} node
 * @param {string} key
 * @param {string} resource - The URL of the image file.
 * @param {SpriteProperties} properties - Properties to configure the sprite.
 */
export function Sprite(node, key, resource, properties) {
  const sprite = new SpriteSheet(key, resource, properties)

  node.addComponent(sprite)
  node.sprites[key] = sprite
}
