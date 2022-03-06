import autoBind from 'auto-bind'

export default class Picto {
  constructor(x, y, w, h) {
    this.ctx = undefined
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    autoBind(this)
  }

  render(ctx) {
    if (!this.ctx) this.ctx = ctx

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}