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
      pictos.push(new Picto(x, y, wh, wh))
    }
  }

  return props => {
    const { context, frame } = props

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    pictos.forEach(p => p.render(context, frame))
  }
}

export default {
  settings,
  sketch,
}