<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let width: number = 50;
    export let height: number = 50

    export let accept = "*";

    export let files: FileList;

    function fileChanged(e) {
        dispatch('change', e);
    }

</script>

<div id="plus-container" style={`width: ${width}px; height: ${height}px`}>

    <p style={`font-size: ${width}px`}>+</p>

    <input type="file" accept={accept} bind:files on:change={fileChanged}>

    

</div>


<style>

    #plus-container {
        border: solid 3px orange;
        border-radius: 6px;
        position: relative;
        color: orange;
        transition-duration: 0.2s;
    }

    #plus-container:hover {
        background-color: rgba(255, 255, 255, 0.5);
        transition-duration: 0.2s;
    }

    p {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0px;
        top: 0px;
        left: 0px;
        display: flex;
        place-content: center;
        place-items: center;
        font-size: 30px;
    }

    input {
        opacity: 0;
        width: 100%;
        height: 100%;
    }

</style>