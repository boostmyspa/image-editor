<template>
    <div class="layer layer-background" @click="selectLayer">
        <i class="layer-type-icon icon-image-preview"></i>

        <div v-if="image && image.src" class="current-image-box">
            <img class="current-image-box--thumbnail" :src="image.src" alt="">
        </div>

        <upload-image-to-canvas class="btn-icon-wrap" title="Add Background Image" :specifiedGalleryRootId="'Backgrounds'">
            <i class="icon-image-update"></i>
        </upload-image-to-canvas>
    </div>
</template>

<script>
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';
    import UploadImageToCanvas from '../uploader/UploadImageToCanvas';

    export default {
        name: "LayerBackground",

        components: {
            'upload-image-to-canvas': UploadImageToCanvas,
        },

        methods: {
            selectLayer () {

            }
        },

        computed: {
            ...mapState('bgImage', [
                'image',
                // 'imageCover',
            ]),
        }
    }
</script>

<style scoped>

</style>