import {
  SYMBOL_FOR_ANIMATED_SPRITE,
  SYMBOL_FOR_SPRITE_SHEET
} from './_symbols.js'
import { logoEngine } from './_logo.js'
import checkCollision from '../lib/collisionHelper.js'

let lastTime
let frame = 0

class Engine {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.$collisions = {}
    this.$areas = []
    this.$listener = () => {}
    this.paused = false
    this.config = {
      devMode: import.meta['env']?.DEV
    }
  }

  onLoaded(listener) {
    this.$listener = listener
  }

  mount(areas2D) {
    this.$areas = this.$areas.concat(areas2D)
    window.requestAnimationFrame((time) => {
      lastTime = time
      window.requestAnimationFrame(animate)
    })
  }

  async init({
    canvas = document.querySelector('canvas'),
    width = 600,
    height = 800,
    imageBrandUrl,
    mediaRef
  } = {}) {
    if (canvas instanceof HTMLCanvasElement) {
      canvas.width = width
      canvas.height = height
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
    } else throw new Error()

    document.body.style.background = 'white'

    const { renderImageLogo } = await import('../lib/renderImageLogo')

    function showLogoEngine() {
      renderImageLogo(logoEngine, Cuarzo.$listener)
      document.body.style.removeProperty('background')
    }

    if (typeof imageBrandUrl === 'string')
      return renderImageLogo(imageBrandUrl, showLogoEngine)

    if (typeof mediaRef !== 'undefined') {
      if (!(mediaRef instanceof HTMLVideoElement)) throw new Error()
      const { loadVideoBrand } = await import('../lib/loadVideoBrand')
      return loadVideoBrand(mediaRef, showLogoEngine)
    }

    showLogoEngine()
  }

  clearView() {
    this.ctx?.clearRect(
      0,
      0,
      this.canvas?.width || 800,
      this.canvas?.height || 600
    )
  }
}

export const Cuarzo = new Engine()

function animate(time) {
  Cuarzo.clearView()
  const delta = time - lastTime
  frame++

  for (const area of Cuarzo.$areas) {
    if (typeof area === 'function') {
      area(delta)
      continue
    }

    if (!area.$active) continue

    if (!Cuarzo.paused && area.Update) area.Update(delta, frame)

    if (
      Cuarzo.$collisions[area.$name] &&
      typeof area.onCollision === 'function'
    ) {
      for (const collisionId in Cuarzo.$collisions) {
        if (area.$name === collisionId) continue
        const collisionsArea2 = Cuarzo.$collisions[collisionId]

        area.$collisions.forEach((_, i) => {
          collisionsArea2.$collisions.forEach((_, j) => {
            if (
              checkCollision([area, i], [collisionsArea2, j]) &&
              area.onCollision
            ) {
              area.onCollision(collisionsArea2)
            }
          })
        })
      }
    }

    for (const comp of area.$components) {
      if (
        comp.$typeof === SYMBOL_FOR_ANIMATED_SPRITE ||
        comp.$typeof === SYMBOL_FOR_SPRITE_SHEET
      )
        spriteRenderer(area, comp)
    }

    // [devMode]: shows the collision area
    if (Cuarzo.config.devMode) {
      area.$collisions?.forEach((collision, i) => collision.showArea(area, i))
    }
  }

  lastTime = time
  window.requestAnimationFrame(animate)
}

function spriteRenderer(area2D, comp) {
  if (typeof comp.update === 'function') comp.update(frame)
  comp.draw(area2D)
}
