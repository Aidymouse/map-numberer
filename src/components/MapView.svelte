<script lang="ts">

import { afterUpdate, beforeUpdate } from "svelte";



let main_canvas: HTMLCanvasElement;

export let image: HTMLImageElement;

function on_render() {
}

function render_all() {
    const ctx: CanvasRenderingContext2D = main_canvas.getContext("2d")
    
    ctx.drawImage(image, 0, 0);

}

</script>

<canvas width="500" height="500" bind:this={main_canvas}>

</canvas>