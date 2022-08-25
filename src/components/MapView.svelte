<script lang="ts">

    import PlusButtonFileInput from './PlusButtonFileInput.svelte'

    let mapImage = new Image();

    let mapLoading = false;

    let imageFiles: FileList;
    async function loadImage() {
        mapLoading = true;

        if (imageFiles.length < 1) return;

        var fr = new FileReader();
        fr.onload = () => {
            mapImage.src = fr.result as string
            mapImage.onload = () => {
                mapLoading = false
            }
        }
        fr.readAsDataURL(imageFiles[0])


    }

</script>


<section>



    {#if mapLoading}
        <p style="color: black">Loading...</p>
    
    {:else if !mapImage.src}
        <PlusButtonFileInput bind:files={imageFiles} on:change={loadImage} width={100} height={100} accept="image/*" />
    
    
    {:else}
        <img id="map" src={mapImage.src} alt="Loaded Map">

    {/if}


</section>


<style>

    section {
        display: flex;
        place-content: center;
        place-items: center;
        margin: 10px;
    }

    #map {
        max-width: 100%;
    }

</style>