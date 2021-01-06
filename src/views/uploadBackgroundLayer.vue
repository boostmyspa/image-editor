<template>
    <upload-image :dragUploadEnable="dragUploadEnable" @uploadedImage="uploadedImage"></upload-image>
</template>

<script>
    import { mapActions } from 'vuex';
    import UploadImage from './UploadImage';

    export default {
        name: "uploadBackgroundLayer",
        components: {
            'upload-image': UploadImage,
        },
        props: [
            'dragUploadEnable'
        ],

        methods: {
            ...mapActions('bgImage', [
                'setUploadedImage',
            ]),

            uploadedImage (image) {
                this.setUploadedImage(image);
            }
        }
    }
</script>

<style scoped>

</style>