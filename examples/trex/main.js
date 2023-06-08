import { Cuarzo } from 'cuarzo/core'
import { Area2D } from 'cuarzo/node/area2D'
import { AnimatedSprite } from 'cuarzo/sprite/animated'
import { Sprite } from 'cuarzo/sprite'
import { Input } from 'cuarzo/input'
import { CollisionShare } from 'cuarzo/collision'

// Cuarzo you can enable some utilities for development
// Cuarzo development mode uses Vite JS behind so when this
// package is in development mode the Cuarzo development tools will be activated
// Cuarzo.config.devMode = false // enable/disable Cuarzo development mode

// Initialize the engine
Cuarzo.init({
  width: 700,
  height: 300
})

// Some constants and variables for this game
const GROUND = 258
const MAX_JUMP_HEIGHT = 150
let score = 0

// Design the dinosaur
const dino = new Area2D('dino', {
  position: { x: 50, y: GROUND },
  size: { w: 50, h: 50 },
  // Internal variables to use inside the model
  vy: 0,
  gravity: 0.0015,
  jumpSpeed: 0.25,
  jumping: false,
  falling: false,
  // the update function is called for each frame
  Update(delta) {
    if (!this.jumping && !this.falling && Input.getKeyPressed('jump')) {
      this.vy = 0
      this.jumping = true
      this.$animation('jump')
    }

    if (this.jumping) {
      this.vy -= this.gravity * delta
      if (this.position.y <= MAX_JUMP_HEIGHT) {
        this.falling = true
        this.jumping = false
        this.vy = this.jumpSpeed
      }
      this.position.y += this.vy * delta
    }

    if (this.falling) {
      this.vy -= this.gravity * delta
      this.position.y -= this.vy * delta
      if (this.position.y >= GROUND) {
        this.falling = false
        this.position.y = GROUND
        this.$animation('run')
      }
    }
  },
  // the function on Collision is detected when there is a collision
  // with some area2D that was previously assigned a collision
  onCollision(area2D) {
    if (area2D.$name === 'cactus') {
      this.$animation('bang')
      Cuarzo.paused = true
    }
  }
})

AnimatedSprite(
  dino,
  {
    run: [
      'res://dino/run/1.webp',
      'res://dino/run/2.webp',
      'res://dino/run/3.webp',
      'res://dino/run/4.webp'
    ],
    bang: 'res://dino/bang.webp',
    jump: 'res://dino/jump.webp'
  },
  15
)
CollisionShare(dino, {
  position: { x: 12.5, y: 12.5 },
  size: { w: 25, h: 25 }
})

// Background
const background = new Area2D('background', {
  size: { w: Cuarzo.canvas.width, h: Cuarzo.canvas.height }
})
Sprite('background', background, 'res://sky.webp')

// Mountains
const mountain = new Area2D('mountain', {
  position: { x: 0, y: 10 },
  size: { w: Cuarzo.canvas.width * 16, h: Cuarzo.canvas.height },
  Update(delta) {
    const levelSpeed = score * delta * 0.4 || 5
    this.position.x -= levelSpeed
    if (this.position.x <= -Cuarzo.canvas.width * 15) this.position.x = 0
  }
})

Sprite('mountain', mountain, 'res://mountain.webp')

// Created cactus
const cactus = new Area2D('cactus', {
  position: { x: Cuarzo.canvas.width, y: GROUND },
  size: { w: 28, h: 48 },
  Update(delta) {
    const levelSpeed = score * delta * 0.4 || 5
    this.position.x -= levelSpeed
    if (this.position.x <= -this.size.w) this.position.x = Cuarzo.canvas.width
  }
})
Sprite('cactus', cactus, 'res://cactus.webp')
CollisionShare(cactus, {
  size: { w: 25 }
})

Cuarzo.onLoaded(() => {
  Cuarzo.mount([background, mountain, dino, cactus])
})
