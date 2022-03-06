<script>
  import { onMount } from 'svelte'
  import canvasSketch from 'canvas-sketch'
  import { Pane } from 'tweakpane'

  // The sketch itself
  import source from './sketch'

	let canvas,
      manager

  const init = async () => {
    const { sketch, settings } = source
    const config = {
      canvas,
      animate: false,
      playing: false,
      styleCanvas: false,
      ...settings,
    }

    manager = await canvasSketch(sketch, config)
  }

  onMount(() => {
    init()
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
	}
</style>