<template>
    <upload-image-to-canvas v-if="!uploadedImage" :specifiedGalleryRootId="'Backgrounds'" :dragUploadEnable="true">
        <p class="text-center">
            Drag Your Design Here
        </p>
    </upload-image-to-canvas>

    <upload-image-to-canvas v-else :multiple="true" :dragUploadEnable="true">
        <canvas-main></canvas-main>
    </upload-image-to-canvas>
</template>

<script>
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';
    import UploadImageToCanvas from '../uploader/UploadImageToCanvas';
    import CanvasMain from './CanvasMain';

    export default {
        name: "CanvasContiner",
        components: {
            'upload-image-to-canvas': UploadImageToCanvas,
            'canvas-main': CanvasMain,
        },

        computed: {
            ...mapState('bgImage', {
                uploadedImage: 'image'
            }),
        }
    }
</script>

<style scoped>

</style>