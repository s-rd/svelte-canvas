import autoBind from 'auto-bind'
import { range, pick } from 'canvas-sketch-util/random'

const pictos = [
  'asterisk',
  'columns',
  'diamond_ellipse',
  'diamond_inverse',
  'diamond_square',
  'diamond',
  'doublipse_stacked',
  'doublipse',
  'ellipse_diamond',
  'ellipse_inverse',
  'ellipse_square',
  'ellipse',
  'heart',
  'hourglass',
  'monster_diamond',
  'monster_ellipse',
  'monster_square',
  'monster',
  'octagon_diamond',
  'octagon_ellipse',
  'octagon_square',
  'octagon',
  'square_diamond',
  'square_ellipse',
  'square_inverse',
  'square',
  'tree',
  'triangle',
]

const directions = [
  'north',
  'east',
  'south',
  'west',
]

export default class Picto {
  constructor(x, y, w, h, i, lifespan) {
    this.ctx = undefined

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.i = i

    this.initial = {
      x, y,
    }

    this.direction = pick(directions)
    this.lifespan = lifespan || range(2000, 40000)
    this.moved = 0

    // State
    this.destroying = false
    this.destroyed = false
    this.hasDestroyed = false

    this.shape = pictos[Math.floor(Math.random() * pictos.length)]
    this.image = undefined
    this.loadImage()

    autoBind(this)
  }

  render(ctx, frame) {
    if (!this.ctx) this.ctx = ctx

    const cx = this.ctx

    // Define clip mask
    cx.save()

    cx.beginPath()
    cx.rect(this.initial.x, this.initial.y, this.w, this.h)
    cx.clip()

    // Render image
    if (this.image) {
      cx.drawImage(this.image, this.x, this.y, this.w, this.h)
    } else {
      cx.fillStyle = 'blue';
      cx.fillRect(this.x, this.y, this.w, this.h)
    }

    // Update lifespan
    this.lifespan -= frame

    // Start destroying if lifespan is ending
    if (this.lifespan < 0 && !this.destroyed) {
      this.destroy()
    }

    cx.restore()
  }

  destroy() {
    if (!this.destroyed && this.moved > Math.max(this.w, this.h) + 8) {
      this.destroyed = true
      return
    }

    const speed = 2

    switch (this.direction) {
      case 'north':
        this.y -= speed
        break
      case 'east':
        this.x += speed
        break
      case 'south':
        this.y += speed
        break
      case 'west':
        this.x -= speed
    }

    this.destroying = true
    this.moved += speed
  }

  handleDestroyed() {
    if (this.hasDestroyed) return
    this.hasDestroyed = true
    // console.log('destroyed', this.i, this.x, this.y)
    console.log('destroyed', this.i)
  }

  loadImage() {
    const img = new Image()
    img.onload = () => {
      this.image = img
    }
    img.src = `/pictos/${this.shape}.svg`
  }

  get isDestroying() {
    return this.destroying
  }
  get isDestroyed() {
    return this.destroyed
  }
  get pos() {
    return this.initial
  }
}