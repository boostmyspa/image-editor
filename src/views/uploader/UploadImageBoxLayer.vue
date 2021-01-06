<template>
    <upload-image :dragUploadEnable="true" @uploadedImage="uploadedImage">
        <slot></slot>
    </upload-image>
</template>

<script>
    import { /*mapState, mapGetters,*/ mapActions } from 'vuex';
    import UploadImage from './UploadImage';

    export default {
        name: "uploadImageBoxLayer",
        components: {
            'upload-image': UploadImage,
        },

        methods: {
            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),

            uploadedImage (image) {
                let item = {
                    image,
                    src: image.src
                };

                this.addImageBox(item);
            }
        }
    }
</script>

<style scoped>

</style>