<script>
  import { onMount } from 'svelte'
  import canvasSketch from 'canvas-sketch'
  import { Pane } from 'tweakpane'

  // The sketch itself
  import source from './sketch'

	let canvas,
      manager

  const PARAMS = {
    rows: 6,
    cols: 6,
  }

  const init = async () => {
    const { sketch, settings } = source
    const config = {
      canvas,
      animate: true,
      playing: true,
      // styleCanvas: false,
      ...settings,
    }

    manager = await canvasSketch(args => sketch(PARAMS, args), config)
  }

  const initPanel = () => {
    const pane = new Pane({
      title: 'Config',
      expanded: true,
    })

    pane.addInput(
      PARAMS, 'rows',
      { min: 1, max: 24, step: 1 },
    )
  }

  onMount(() => {
    init()
    initPanel()
  })
</script>

<main>
  <canvas bind:this={canvas} />
</main>

<style>
	main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fef7f7;
	}

  canvas {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05);
  }
</style>