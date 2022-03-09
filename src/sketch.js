import Picto from './lib/Picto'

const settings = {
  dimensions: [ 600, 600 ]
}

const sketch = (params, args) => {
  const { width, height } = args

  let pictos = new Set()

  const cols = 12
  const rows = 12
  const gap = 4
  const wh = width / cols

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = gap + (width / cols) * i
      const y = gap + (height / rows) * j
      const index = (rows * i) + j
      pictos.add(new Picto(x, y, wh, wh, index))
    }
  }

  return props => {
    const { context } = props

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    pictos.forEach((p, i) => {
      p.render(context)
    })

    // pictos.filter(p => p && p.destroyed).forEach((p, i) => {
    //   if (!p.hasDestroyed) {
    //     p.handleDestroyed()

    //     // pictos.splice(i, 1)
    //     pictos[i] = null

    //     setTimeout(() => {
    //       pictos.push(new Picto(p.initial.x, p.initial.y, wh, wh, p.i))
    //     }, 500)

    //     // console.log(pictos)
    //   }
    // })
  }
}

export default {
  settings,
  sketch,
}