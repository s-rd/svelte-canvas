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
    const x = gap + (width / cols) * i
    const y = gap + (height / rows) * i
    pictos.push(new Picto(x, y, wh, wh))
  }

  return props => {
    const { context } = props

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    pictos.forEach(p => p.render(context))
  }
}

export default {
  settings,
  sketch,
}