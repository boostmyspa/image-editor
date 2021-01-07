<template>
    <upload-image :dragUploadEnable="dragUploadEnable" :label="label" @uploadedImage="uploadedImage">
        <slot></slot>
    </upload-image>
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
            'label',
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