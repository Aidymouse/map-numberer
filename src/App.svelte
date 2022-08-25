<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  
  import MapView from './components/MapView.svelte';
  import Controls from './components/Controls.svelte';

</script>

<main>

  <MapView />
  <Controls />

</main>

<style>

  main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }

</style>