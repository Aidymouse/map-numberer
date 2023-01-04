<script lang="ts">

    export let settings;

    export let toggle_controls: Function;

</script>

<aside id="settings" class="hidden">


    <div id="settings-flex">
        <div class="setting-row">
            <label for="setting_autoincr">Auto-Increment</label> <input id="setting_autoincr" type="checkbox" bind:checked={settings.autoincrement} />
            <p class="tiny-text">Automatically increases number on cursor when placed</p>
        </div>
        
        <button on:click={toggle_controls} class="light-button">Toggle Controls</button>
        
    </div>
    
    
    <div id="settings-flex" style="gap: 0em;">
        <p class="tiny-text"><span class="highlight">Map Numberer</span> version 1.1</p>
        <p class="tiny-text">By <a href="https://github.com/Aidymouse/map-numberer">Aidymouse</a></p>
        
        <p class="tiny-text" style="margin-top: 0.5em"><span class="highlight">Special thanks:</span> pyrokov</p>
        
        <p class="tiny-text" style="margin-top: 0.5em">Cog icon by <a href="https://www.flaticon.com/free-icons/cog" title="cog icons">Dave Gandy</a></p>
        <p class="tiny-text">Arrow icon by <a href="https://www.flaticon.com/free-icons/play" title="next icons">Roundicons</a></p>
        
        <p class="tiny-text" style="margin-top: 0.5em">See also: <a href="https://www.hexfriend.net">Hexfriend</a>, <a href="https://dagloopy.blogspot.com/">DaGloopy</a></p>
    </div>
      


</aside>


<style>

    span.highlight {
        color: #f2f2f2;
    }

    .hidden {
        display: none !important;
    }

    #settings-flex {
        display: flex;
        flex-direction: column;
        gap: 1em;
        background-color: #222222;
        padding: 1em;
        border-radius: 0.5em;
        margin-bottom: 0.5em;
    }

    #settings {
        display: block;
        width: 15em;
        margin-top: 0.5em;
        box-sizing: border-box;
        color: #f2f2f2;
    }



</style>