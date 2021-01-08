<template>
    <upload-image :dragUploadEnable="dragUploadEnable" :label="label" :multiple="multiple" @uploadedImage="uploadedImage">
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
            'dragUploadEnable',
            'multiple',
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