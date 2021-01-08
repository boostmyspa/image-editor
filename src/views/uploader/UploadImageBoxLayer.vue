<template>
    <upload-image :dragUploadEnable="true" :multiple="multiple" @uploadedImage="uploadedImage">
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

        props: [
            'multiple',
        ],

        methods: {
            ...mapActions([
                'setSelectedLayerIdToLastId'
            ]),

            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),

            uploadedImage (image) {
                let item = {
                    image,
                    src: image.src
                };

                this.addImageBox(item);
                this.setSelectedLayerIdToLastId();
            }
        }
    }
</script>

<style scoped>

</style>