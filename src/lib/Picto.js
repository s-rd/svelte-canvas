import autoBind from 'auto-bind'
import { range, pick } from 'canvas-sketch-util/random'

const pictos = [
  'asterisk',
  'columns',
  'diamond',
  'diamond_ellipse',
  'diamond_inverse',
  'diamond_square',
  'doublipse',
  'doublipse_stacked',
  'ellipse',
  'ellipse_diamond',
  'ellipse_inverse',
  'ellipse_square',
  'heart',
  'hourglass',
  'monster',
  'monster_diamond',
  'monster_ellipse',
  'monster_square',
  'octagon',
  'octagon_diamond',
  'octagon_ellipse',
  'octagon_square',
  'square',
  'square_diamond',
  'square_ellipse',
  'square_inverse',
  'tree',
  'triangle',
]

const directions = [
  'north',
  'east',
  'south',
  'west',
]

const introLength = 2000
const gap = 4

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
    this.isInitiated = false
    this.isDestroying = false
    this.isDestroyed = false
    this.hasDestroyed = false
    this.hasIntroed = false
    this.isIntroing = false

    this.direction = pick(directions)
    this.initialLifespan = range(100, 3000)
    this.lifespan = this.initialLifespan

    this.x = this.initial.x
    this.y = this.initial.y
    this.moved = 0

    this.shape = pictos[Math.floor(Math.random() * pictos.length)]
    this.image = undefined

    setTimeout(() => this.loadImage(), 100)

    this.isInitiated = true
  }

  render(ctx) {
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
    }

    // Update lifespan
    this.lifespan -= 1

    // Start intro
    if (this.hasIntroed) {
      this.onIntroEnded()
    } else if (this.lifespan > (this.initialLifespan-introLength) && !this.hasIntroed) {
      this.intro()
    }

    // Start outro if lifespan is ending
    if (this.lifespan < 0 && !this.isDestroyed) {
      this.outro()
    }

    cx.restore()
  }

  intro() {
    if (!this.isIntroing && this.x === this.initial.x && this.y === this.initial.y) {
      switch (this.direction) {
        case 'north':
          this.y -= this.h/2
          break
        case 'south':
          this.y += this.h/2
          break
        case 'east':
          this.x += this.w/2
          break
        case 'west':
          this.x -= this.w/2
      }
    }

    const speed = this.w/100

    this.isIntroing = true

    switch (this.direction) {
      case 'north':
        this.y += speed
        break
      case 'east':
        this.x -= speed
        break
      case 'south':
        this.y -= speed
        break
      case 'west':
        this.x += speed
    }
  }

  outro() {
    if (!this.isDestroyed && this.moved > Math.max(this.w, this.h) + 8) {
      this.lifespan = 9999999
      this.isDestroyed = true
      this.onOutroEnded()
      return
    }

    const speed = this.w/100

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

  onIntroEnded() {
    if (this.hasIntroed) return
    this.hasIntroed = true
    this.direction = pick(directions)
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