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
  constructor(x, y, w, h, i) {
    this.ctx = undefined
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.i = i

    this.initial = {
      x, y,
    }

    autoBind(this)

    this.init()
  }

  init() {
    this.x = this.initial.x
    this.y = this.initial.y

    this.isInitiated = false
    this.isDestroying = false
    this.isDestroyed = false
    this.hasDestroyed = false

    this.direction = pick(directions)
    this.lifespan = range(1000, 900000)
    this.moved = 0

    this.shape = pictos[Math.floor(Math.random() * pictos.length)]
    this.image = undefined

    setTimeout(() => this.loadImage(), 100)

    this.isInitiated = true
  }

  render(ctx, frame) {
    if (!this.ctx) this.ctx = ctx
    if (this.isDestroyed || !this.isInitiated) return

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
      // cx.fillStyle = '#5a27f0';
      cx.fillRect(this.x, this.y, this.w, this.h)
    }

    // Update lifespan
    this.lifespan -= frame

    // Start destroying if lifespan is ending
    if (this.lifespan < 0 && !this.isDestroyed) {
      this.outro()
    }

    cx.restore()
  }

  outro() {
    if (!this.isDestroyed && this.moved > Math.max(this.w, this.h) + 8) {
      this.lifespan = 999999
      this.isDestroyed = true
      this.onOutroEnded()
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

    this.isDestroying = true
    this.moved += speed
  }

  onOutroEnded() {
    if (this.hasDestroyed) return
    this.hasDestroyed = true
    this.init()
  }

  loadImage() {
    const img = new Image()
    img.onload = () => {
      this.image = img
    }
    img.src = `/pictos/${this.shape}.svg`
  }
}