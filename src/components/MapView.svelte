<script lang="ts">

    import PlusButtonFileInput from './PlusButtonFileInput.svelte'

    let mapImage = new Image();

    let imageFiles: FileList;
    function loadImage(e) {

        if (imageFiles.length < 1) return;

        var fr = new FileReader();
        fr.onload = () => {
            mapImage.src = fr.result
        }
        fr.readAsDataURL(imageFiles[0])

    }

</script>


<section>

    {#if mapImage.src}
        <img src={mapImage.src} alt="Loaded Map">

    {:else}
        <PlusButtonFileInput bind:files={imageFiles} on:change={loadImage} width={100} height={100} accept="image/*" />

    {/if}


</section>


<style>

    section {
        display: flex;
        place-content: center;
        place-items: center;
    }

</style>