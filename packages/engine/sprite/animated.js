import { SYMBOL_FOR_ANIMATED_SPRITE } from '../core/_symbols'
import { Cuarzo } from '../core'
import loadTexture from '../lib/loadTexture'

class Frames {
  constructor(frames, fps) {
    this.frames =
      typeof frames === 'string'
        ? [loadTexture(frames)]
        : frames.map(loadTexture)
    this.FPS = parseInt(String(100 / fps))
  }
}

export class AnimationSprite {
  constructor(animationName = null) {
    this.name = animationName
    this.frame = 0
    this.frames = new Map()
    this.playing = true
    this.$typeof = SYMBOL_FOR_ANIMATED_SPRITE
  }

  update(frame) {
    const { FPS } = this.frames.get(this.name)
    if (!this.playing || FPS === 0) return
    if (frame % FPS !== 0) return
    this.frame++
  }

  draw(props) {
    const { frames } = this.frames.get(this.name)
    if (this.frame >= frames.length) this.frame = 0
    const image = frames instanceof Image ? frames : frames[this.frame]
    Cuarzo.ctx?.drawImage(
      image,
      props.position.x,
      props.position.y,
      props.size.w,
      props.size.h
    )
  }
}

export function AnimatedSprite(area2D, resources, properties = {}) {
  const resourcesKeys = Object.keys(resources)
  const animation = new AnimationSprite(resourcesKeys[0])

  for (const key of resourcesKeys) {
    const fps =
      (typeof properties === 'object' && properties[key]) ||
      (typeof properties === 'number' && properties)

    // if key is string
    if (typeof key === 'string') {
      animation.frames.set(key, new Frames(resources[key], fps))
      continue
    }

    // if key is array
    animation.frames.set(key, new Frames(resources[key], fps))
  }

  Object.defineProperty(area2D, '$animation', {
    writable: true,
    value(name) {
      animation.name = name
    }
  })

  area2D.$components.add(animation)
}
