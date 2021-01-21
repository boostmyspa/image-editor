<template>
    <div>
        <upload-image-to-canvas class="btn-icon-wrap" title="Add Background Image" :specifiedGalleryRootId="'Backgrounds'">
            <i class="icon-image-preview"></i>
        </upload-image-to-canvas>

        <upload-image-to-canvas class="btn-icon-wrap" title="Add Static Image" :specifiedGalleryRootId="'Statics'">
            <i class="icon-image"></i>
        </upload-image-to-canvas>

        <button @click="addNewTextBox" class="btn-icon-wrap" title="Add Static Text">
            <i class="icon-add-text"></i>
        </button>
    </div>
</template>

<script>
    import { /*mapState, mapGetters,*/ mapActions } from 'vuex';
    import UploadImageToCanvas from '../uploader/UploadImageToCanvas';

    export default {
        name: "BarAddLayer",

        components: {
            'upload-image-to-canvas': UploadImageToCanvas,
        },

        methods: {
            ...mapActions('textBox', {
                addTextBox: 'add',
            }),

            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),

            addNewTextBox () {
                this.addTextBox();
            },

            addNewImageBox (image) {
                let imageItem = {
                    type: 'imageStatic',
                    image: image,
                    src: image.src
                };

                this.addImageBox(imageItem);
            },
        }
    }
</script>

<style scoped>

</style>