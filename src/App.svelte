<script lang="ts">
  import { afterUpdate } from 'svelte';

  import cog from './assets/cog.png'
  
  import MapView from './components/MapView.svelte';
  import PlusButtonFileInput from './components/PlusButtonFileInput.svelte';

  let raw_canvas: HTMLCanvasElement;
  let main_canvas: HTMLCanvasElement;

  let setting_autoincrement = true;

  let shift_held = false;
  
  let scale_factor = 1;
  let pan = {
    x: 0,
    y: 0,
    oldX: -1,
    oldY: -1,
    active: false,
  }

  let map_numbers = [];
  let map_pointer = -1;
  let floating_number = {
    number: 1,
    x: 0,
    y: 0,
    render: true
  };

  let text_font = "Segoe UI"
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
    
    let working_set = map_numbers.slice(0, map_pointer+1)

    working_set.forEach(MN => {
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
    render_all()
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
  
  function get_highest_number() {
    let highest_num = 0
    map_numbers.slice(0, map_pointer+1).forEach(mn => {
      if (mn.number > highest_num) highest_num = mn.number
    })

    return highest_num

  }

  // POINTER //
  function pointerdown(e) {
    if (!map_image.src) return;
    if (e.button == 0) {

      let mPos = getMousePos(e)
  
      map_numbers = map_numbers.slice(0, map_pointer+1)
  
      
      map_numbers.push(
        {
          number: floating_number.number,
          x: mPos.x,
          y: mPos.y
        }
        )
        
      map_pointer += 1
      if (!shift_held && setting_autoincrement) floating_number.number = get_highest_number() + 1
  
    
    } else if (e.button == 2) {
      pan.active = true
      let mPos = getMouseScreenPos(e)
      pan.oldX = mPos.x
      pan.oldY = mPos.y
    }

    render_all()


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
    let wheel_dir = e.wheelDeltaY / Math.abs(e.wheelDeltaY)
    
    if (shift_held) {

      floating_number.number += 1 * wheel_dir
      floating_number.number = Math.max(0, floating_number.number) 

    } else {

      // Gets wheel dir as 1 for scroll up and -1 for scroll down
      let posBeforeZoom = getMousePos(e)
      
      scale_factor *= 1 + (0.2 * wheel_dir)
  
      scale_factor = Math.max(scale_factor, 0.1)
  
      let posAfterZoom = getMousePos(e)
  
      let dX = (posAfterZoom.x - posBeforeZoom.x) * scale_factor
      let dY = (posAfterZoom.y - posBeforeZoom.y) * scale_factor 
  
      pan.x += dX
      pan.y += dY
    
    }

    render_all()

  }

  function keydown(e) {
    switch (e.key) {
      case "Shift": {
        shift_held = true
        break
      }
    }

    if (e.ctrlKey) {

      switch (e.key) {

        case "z": {

          if (map_pointer >= 0) {
      
            map_pointer -= 1
            floating_number.number = get_highest_number() + 1
          } 
          
          break
        }
        
        case "Z": {
          if (map_pointer < map_numbers.length) {
            map_pointer += 1
          } 
        }
      }

      
    } 

    render_all()
  }

  function keyup(e) {
    switch (e.key) {
      case "Shift": {
        shift_held = false
        floating_number.number = get_highest_number() + 1
        render_all()
      }
    }
  }

  afterUpdate(() => {
    render_all()
  })


  function toggle_settings() {
    let settings = document.getElementById("settings")
    settings.classList.contains("hidden") ? settings.classList.remove("hidden") : settings.classList.add("hidden")
  }

</script>

<svelte:window on:resize={window_resize} on:load={window_resize} on:keydown={keydown} on:keyup={keyup}/>

<main>

  
  <aside id="settings-aside">
    <button id="settings-button" on:click={toggle_settings}><img src={cog}></button>
    <span id="settings" class="hidden">
      Auto-Increment
      <input type="checkbox" bind:checked={setting_autoincrement} />
      <p class="tiny-text">Automatically increases number on cursor when placed</p>

      <hr style="color: #bbbbbb">
      <p class="tiny-text" style="margin-top: 0.5em">Map Numberer version 1.0</p>
      <p class="tiny-text" style="margin-top: 0.25em">By <a href="https://github.com/Aidymouse/map-numberer">Aidymouse</a></p>
      <p class="tiny-text">Cog icon by <a href="https://www.flaticon.com/free-icons/cog" title="cog icons">Dave Gandy</a></p>
      <p class="tiny-text" style="margin-top: 0.25em">See also: <a href="https://www.hexfriend.net">Hexfriend</a>, <a href="https://dagloopy.blogspot.com/">DaGloopy</a></p>
    </span>
  </aside>

  <aside id="floating-aside" class="stowed">
    <button id="aside-toggle" on:click={toggle_aside}> &lt; </button>

    <div id="controls">
      <p>Text</p>
      <input type="number" bind:value={text_size} />
      <input type="range" min=10 max=100 bind:value={text_size} />
      <input type="color" bind:value={text_fill} />

      <select bind:value={text_font} >
        <option value={"Segoe UI"}>Segoe UI</option>
        <option value={"Arial"}>Arial</option>
        <option value={"Comic Sans MS"}>Comic Sans</option>
        <option value={"Times New Roman"}>Times New Roman</option>
      </select>
      
      <p>Outline</p>
      <input type="number" bind:value={text_stroke_thickness} />
      <input type="range" min=0 max=20 bind:value={text_stroke_thickness} />
      <input type="color" bind:value={text_stroke} />


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

#floating-aside {
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

#floating-aside.stowed {
  margin-right: -15em;
  transition-duration: 0.2s;
}

#aside-toggle {
  width: 3em;
  height: 5em;
  position: absolute;
  left: -3em;
}

button {
  background-color: #222222;
  border: none;
  color: #f2f2f2;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: bold;
}

button:hover {
  background-color: #555555;
}


/* SETTINGS */
.hidden {
  display: none !important;
}

#settings-aside {
  position: fixed;
  padding: 1em;
  right: 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

#settings-button {
  width: 4em;
  height: 4em;
  border-radius: 3px;
}

#settings-button img {
  width: 50%;
}

#settings {
  display: block;
  width: 15em;
  margin-top: 0.5em;
  background-color: #222222;
  padding: 0.5em;
  box-sizing: border-box;
  color: #f2f2f2;
}

.tiny-text {
  font-size: 9pt;
  margin: 0px;
  color: #bbbbbb;
}

a {
  color: #8cc63f;
}

</style>