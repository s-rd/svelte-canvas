import Picto from './lib/Picto'

const settings = {
  dimensions: [ 600, 600 ]
}

const sketch = (params, args) => {
  const { width, height } = args

  let pictos = []

  const cols = 6
  const rows = 6
  const gap = 4
  const wh = width / cols - (gap * 2)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      const x = gap + (width / cols) * i
      const y = gap + (height / rows) * j
      const index = (rows * i) + j
      pictos.push(new Picto(x, y, wh, wh, index))
    }
  }

  return props => {
    const { context, frame } = props

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    pictos.filter(p => p && !p.destroyed).forEach((p, i) => {
      p.render(context, frame)
    })

    pictos.filter(p => p && p.destroyed).forEach((p, i) => {
      if (!p.hasDestroyed) {
        p.handleDestroyed()

        // pictos.splice(i, 1)
        pictos[i] = null

        setTimeout(() => {
          pictos.push(new Picto(p.initial.x, p.initial.y, wh, wh, p.i))
        }, 500)
      }
    })
  }
}

export default {
  settings,
  sketch,
}