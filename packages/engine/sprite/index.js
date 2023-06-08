import { Area2D } from '../node/area2D'
import { Cuarzo } from '../core'
import { SYMBOL_FOR_SPRITE_SHEET } from '../core/_symbols'
import loadTexture from '../lib/loadTexture'

export class SpriteSheet extends Area2D {
  constructor(
    key,
    texture,
    {
      vFrame = 1,
      hFrame = 1,
      frameX = 1,
      frameY = 1,
      frameCoords = { x: 0, y: 0 }
    }
  ) {
    super(key, arguments[2])
    this.texture = loadTexture(texture)
    // Animation
    this.vFrame = vFrame
    this.hFrame = hFrame
    this.frameX = frameX
    this.frameY = frameY
    this.frameCoords = frameCoords
    this.$typeof = SYMBOL_FOR_SPRITE_SHEET
  }

  draw(props) {
    this.frameCoords.x = (this.texture.width / this.vFrame) * this.frameX
    this.frameCoords.y = (this.texture.height / this.hFrame) * this.frameY

    Cuarzo.ctx?.save()
    Cuarzo.ctx?.rotate(this.transform.rotate)
    Cuarzo.ctx?.drawImage(
      this.texture,
      this.transform.scale.x,
      this.transform.scale.y,
      this.frameCoords.x,
      this.frameCoords.y,
      this.position.x + props.position.x,
      this.position.y + props.position.y,
      props.size.w || this.texture.width,
      props.size.h || this.texture.height
    )
    Cuarzo.ctx?.restore()
  }
}

export function Sprite(key, area2D, resource, properties = {}) {
  const sprite = new SpriteSheet(key, resource, properties)
  if (typeof area2D.$sprite !== 'object') area2D.$sprite = {}
  area2D.$components.add(sprite)
  area2D.$sprite[key] = sprite
}
