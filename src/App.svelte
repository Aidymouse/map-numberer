<script lang="ts">

  
  import MapView from './components/MapView.svelte';
  import PlusButtonFileInput from './components/PlusButtonFileInput.svelte';

  let raw_canvas: HTMLCanvasElement;
  let main_canvas: HTMLCanvasElement;

  let scale_factor = 1;
  let pan = {
    x: 0,
    y: 0,
    oldX: -1,
    oldY: -1,
    active: false,
  }

  let map_numbers = [];
  let floating_number = {
    number: 1,
    x: 0,
    y: 0,
    render: true
  };

  let text_font = "Arial"
  let text_fill = "#333333";
  let text_size = 20;
  let text_stroke = "#f2f2f2";
  let text_stroke_thickness = 5;

  let map_image = new Image();
  map_image.onload = (e) => {

    raw_canvas.width = map_image.width
    raw_canvas.height = map_image.height
    
    // This may need to change in the future
    window_resize()

    render_all()
  }

  let input_files: FileList;
  function update_files() {
    let r = new FileReader();
    r.onload = (e) => {
      map_image.src = e.target.result
    }
    r.readAsDataURL(input_files[0]);
  }

  // CANVAS //
  function render_all() {
    if (!map_image.src) return;

    
    
    const ctx: CanvasRenderingContext2D = raw_canvas.getContext("2d")
    
    // Image
    ctx.drawImage(map_image, 0, 0);

    // Numbers
    ctx.font = `${text_size}pt ${text_font}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.lineWidth = text_stroke_thickness
    ctx.strokeStyle = text_stroke
    ctx.fillStyle = text_fill
    
    map_numbers.forEach(MN => {
      if (text_stroke_thickness > 0) ctx.strokeText(MN.number, MN.x, MN.y)
      ctx.fillText(MN.number, MN.x, MN.y)
    })
    
    if (floating_number.render) {
      if (text_stroke_thickness > 0) ctx.strokeText(floating_number.number, floating_number.x, floating_number.y)
      ctx.fillText(floating_number.number, floating_number.x, floating_number.y)
    }
    
    // Draw map to main screen canvas, scaling as necessary
    const main_ctx = main_canvas.getContext("2d")
    main_ctx.clearRect(0, 0, main_canvas.width, main_canvas.height)
    main_ctx.drawImage(raw_canvas, pan.x, pan.y, map_image.width*scale_factor, map_image.height*scale_factor)

  }


  // UTIL //
  function getMousePos(e) {
    let rect = e.target.getBoundingClientRect()
    return {
      x: (e.clientX - rect.x - pan.x) / scale_factor,
      y: (e.clientY - rect.y - pan.y) / scale_factor
    }
  }
  
  function getMouseScreenPos(e) {
    let rect = e.target.getBoundingClientRect()
    return {
      x: e.clientX - rect.x,
      y: e.clientY - rect.y
    }

  }

  function window_resize() {
    if (!main_canvas) return;

    main_canvas.width = window.innerWidth
    main_canvas.height = window.innerHeight
  }

  function export_map() {
    let anchor = document.createElement("a");
    anchor.href = raw_canvas.toDataURL("image/png")
    anchor.download = "numbered-map.png";
    anchor.click()
  }

  function toggle_aside() {
    let aside = document.getElementById("floating-aside")
    let toggle_button = document.getElementById("aside-toggle")
    if (aside.classList.contains("stowed")) {
      aside.classList.remove("stowed")
      toggle_button.innerHTML = ">"
      
    } else {
      
      aside.classList.add("stowed")
      toggle_button.innerHTML = "<"
    }
  }

  // POINTER //
  function pointerdown(e) {
    if (!map_image.src) return;
    if (e.button == 0) {

      let mPos = getMousePos(e)
  
      let latest_number = map_numbers.length == 0 ? 1 : map_numbers[map_numbers.length-1].number + 1
  
      map_numbers.push(
        {
          number: latest_number,
          x: mPos.x,
          y: mPos.y
        }
      )
  
      floating_number.number = floating_number.number + 1
  
      render_all()
    
    } else if (e.button == 2) {
      pan.active = true
      let mPos = getMouseScreenPos(e)
      pan.oldX = mPos.x
      pan.oldY = mPos.y
    }


  }

  function pointermove(e) {
  


    let mPos = getMousePos(e)

    // Update floating number
    floating_number.x = mPos.x
    floating_number.y = mPos.y

    // Update panning
    if (pan.active) {
      let panPos = getMouseScreenPos(e)
      pan.x += panPos.x - pan.oldX
      pan.y += panPos.y - pan.oldY
      
      pan.oldX = panPos.x
      pan.oldY = panPos.y
    }
    
    render_all()
  }

  function pointerleave() {
    pointerup()

    floating_number.render = false
    render_all()
  }
  
  function pointerenter() {
    floating_number.render = true
    render_all()

  }

  function pointerup() {
    pan.active = false
    pan.oldX = -1
    pan.oldY = -1
  }

  function wheel(e) {
    // Gets wheel dir as 1 for scroll up and -1 for scroll down
    let posBeforeZoom = getMousePos(e)
    
    let wheel_dir = e.wheelDeltaY / Math.abs(e.wheelDeltaY)
    scale_factor *= 1 + (0.2 * wheel_dir)

    scale_factor = Math.max(scale_factor, 0.1)

    let posAfterZoom = getMousePos(e)

    let dX = (posAfterZoom.x - posBeforeZoom.x) * scale_factor
    let dY = (posAfterZoom.y - posBeforeZoom.y) * scale_factor 

    pan.x += dX
    pan.y += dY

    render_all()
  }


</script>

<svelte:window on:resize={window_resize} on:load={window_resize}/>

<main>

  <aside id="floating-aside" class="stowed">
    <button id="aside-toggle" on:click={toggle_aside}> &lt; </button>

    <div id="controls">
      <p>Text</p>
      <input type="number" bind:value={text_size} on:input={render_all} />
      <input type="range" min=10 max=100 bind:value={text_size} on:input={render_all} />
      <input type="color" bind:value={text_fill} on:input={render_all} />

      <select bind:value={text_font} on:change={render_all}>
        <option value={"Segoe UI"}>Segoe UI</option>
        <option value={"Arial"}>Arial</option>
        <option value={"Comic Sans MS"}>Comic Sans</option>
        <option value={"Times New Roman"}>Times New Roman</option>
      </select>
      
      <p>Outline</p>
      <input type="number" bind:value={text_stroke_thickness} on:input={render_all} />
      <input type="range" min=0 max=20 bind:value={text_stroke_thickness} on:input={render_all} />
      <input type="color" bind:value={text_stroke} on:input={render_all} />


      <button on:click={export_map}>Export</button>
    </div>

  </aside>

  <section>
    {#if map_image.src}
      
      <canvas width="500" height="500"
        bind:this={main_canvas}
        on:pointerdown={pointerdown}
        on:pointermove={pointermove}
        on:pointerenter={pointerenter}
        on:pointerleave={pointerleave}
        on:pointerup={pointerup}
        on:contextmenu|preventDefault
        on:wheel={wheel}
      />

      <canvas width="1" height="1" bind:this={raw_canvas} style="display: none;"/>
    
    {:else}
      <PlusButtonFileInput accept="image/*" bind:files={input_files} on:change={update_files} />
    {/if}

  </section>

  

</main>

<style>

p {
  color: #f2f2f2;
}

section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#controls {
  background-color: #222222;
  right: 0;
  border-radius: 3px;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5em;
}

#controls p {
  margin: 0;
}

aside {
  position: fixed;
  display: flex;
  align-items: center;
  right: 0;
  height: 100%;
  padding: 1em;
  padding-left: 0em;
  width: 15em;
  box-sizing: border-box;

  transition-duration: 0.2s;
}

.stowed {
  margin-right: -15em;
  transition-duration: 0.2s;
}

#aside-toggle {
  width: 3em;
  height: 5em;
  position: absolute;
  left: -3em;
}

#aside-toggle {
  background-color: #222222;
  border: none;
  color: #f2f2f2;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: bold;
}

#aside-toggle:hover {
  background-color: #555555;
}

</style>