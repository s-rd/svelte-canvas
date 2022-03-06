const settings = {
  dimensions: [ 256, 256 ]
}

const sketch = () => {
  return props => {
    const { context, width, height } = props

    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);
  }
}

export default {
  settings,
  sketch,
}