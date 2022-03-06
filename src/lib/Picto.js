import autoBind from 'auto-bind'
import { range } from 'canvas-sketch-util/random'

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

export default class Picto {
  constructor(x, y, w, h) {
    this.ctx = undefined

    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.lifespan = range(4000, 8000)

    this.shape = pictos[Math.floor(Math.random() * pictos.length)]
    this.image = undefined
    this.loadImage()

    autoBind(this)
  }

  render(ctx, frame) {
    if (!this.ctx) this.ctx = ctx

    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    } else {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    this.lifespan -= frame
  }

  loadImage() {
    const img = new Image()
    img.onload = () => {
      this.image = img
    }
    img.src = `/pictos/${this.shape}.svg`
  }
}