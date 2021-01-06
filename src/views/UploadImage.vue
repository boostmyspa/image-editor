<template>
    <div v-if="dragUploadEnable" class="upload-image-drag-zone"
         @drop.prevent="handleImage"
         :class="isHovered ? 'hovered' : ''"
         @dragover.prevent="isHovered = true"
         @dragenter.prevent
         @dragleave="isHovered = false"
    >
        <p style="text-align: center">
            Upload Your Design
            <label>
                <input @change="handleImage" type="file" name="imageLoader" accept="image/*">
            </label>
        </p>
    </div>
    <div v-else class="upload-image">
        <label>
            <input @change="handleImage" type="file" name="imageLoader" accept="image/*">
        </label>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "UploadImage",

        props: [
            'dragUploadEnable'
        ],

        data: () => {
            return {
                isHovered: false
            }
        },

        methods: {
            ...mapActions('bgImage', [
                'setUploadedImage',
            ]),

            imageLoaded (imageObj, imageSrc) {
                imageObj.onload = (e) => {
                    let image = e.path[0];
                    this.setUploadedImage(image);
                };

                imageObj.src = imageSrc;
            },

            handleImage (e) {
                this.isHovered = false;

                let
                    imageObj = new Image(),
                    reader = new FileReader();

                reader.onload = (event) => {
                    this.imageLoaded(imageObj, event.target.result);
                };

                if (e.dataTransfer) {
                    // drop upload
                    reader.readAsDataURL(e.dataTransfer.files[0]);
                }
                else {
                    // input upload
                    reader.readAsDataURL(e.target.files[0]);
                }
            }
        },
    }
</script>

<style scoped>
    .upload-image-drag-zone {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

    }

    .upload-image-drag-zone.hovered {
        background: #eee;
    }

    [type="file"] {
        max-width: 100%;
    }
</style>