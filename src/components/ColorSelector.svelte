<script lang="ts">

    import { createEventDispatcher } from 'svelte'

    export let width = "100%"
    export let height = "100%"
    export let css_class = ""

    export let value;

    const dispatch = createEventDispatcher();
    let input_element;

    function oninput(e) {
        dispatch('oninput', e)
    }


</script>

<span class={css_class} style={`width: ${width}; height: ${height}`} >

    <input bind:this={input_element} type="color" on:input={oninput} bind:value>

</span>

<style>

    span {
        border: solid 3px white;
        border-radius: 50%;
    }

</style>