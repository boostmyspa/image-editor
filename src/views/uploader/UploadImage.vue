<template>
    <div v-if="dragUploadEnable" class="upload-image-drag-zone"
         @drop.prevent="handleImage"
         :class="isHovered ? 'hovered' : ''"
         @dragover.prevent="isHovered = true"
         @dragenter.prevent
         @dragleave="isHovered = false"
    >
        <slot></slot>
    </div>
    <div v-else class="upload-image">
        <label>
            <input @change="handleImage" :value="value" type="file" name="imageLoader" accept="image/*">
        </label>
    </div>
</template>

<script>
    export default {
        name: "UploadImage",

        props: [
            'dragUploadEnable'
        ],

        data: () => {
            return {
                value: '',
                isHovered: false
            }
        },

        methods: {
            clearInput () {
               this.value = null
            },

            imageLoaded (imageObj, imageSrc) {
                imageObj.onload = (e) => {
                    let image = e.path[0];
                    this.$emit('uploadedImage', image);

                    // clear the input[type="file"] value for load the same file few times
                    this.clearInput();
                };

                imageObj.src = imageSrc;
            },

            handleImage (e) {
                this.isHovered = false;
                // change value property before clear for trigger the reactivity
                this.value = '';

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