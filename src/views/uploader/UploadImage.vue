<template>
    <div v-if="dragUploadEnable"
         class="upload-image-drag-zone"
         :class="isHovered ? 'hovered' : ''"
         :multiple="multiple"
         @dragover.prevent="isHovered = true"
         @dragenter.prevent
         @dragleave="isHovered = false"
         @drop.prevent="handleImage"
    >
        <slot></slot>
    </div>
    <div v-else class="upload-image">
        <label>
            {{ label }}
            <input type="file" name="imageLoader"
                    :value="value"
                    :multiple="multiple"
                    :accept="acceptFileTypes.join(',')"
                    @change="handleImage"
            >
        </label>
    </div>
</template>

<script>
    export default {
        name: "UploadImage",

        props: {
            label: {
                type: String
            },
            dragUploadEnable: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },

        data: () => {
            return {
                value: '',
                isHovered: false,
                acceptFileTypes: [
                    'image/bmp',
                    'image/jpg',
                    'image/jpeg',
                    'image/png',
                    'image/svg+xml',
                    'image/tiff'
                ]
            }
        },

        methods: {
            clearInput () {
               this.value = null
            },

            acceptImagesOnly (file) {
                const  fileType = file['type'];

                if (!this.acceptFileTypes.includes(fileType)) {
                    return null;
                }

                return file;
            },

            imageLoaded (imageSrc) {
                let imageObj = new Image();

                imageObj.onload = (e) => {
                    let image = e.path[0];
                    this.$emit('uploadedImage', image);
                };

                imageObj.src = imageSrc;
            },

            imageReader (imageSrc) {
                // upload only images
                let correctImageSrc = this.acceptImagesOnly(imageSrc);

                if (!correctImageSrc) return;

                let reader = new FileReader();

                reader.onload = (event) => {
                    this.imageLoaded(event.target.result);
                };

                reader.readAsDataURL(correctImageSrc);
            },

            handleImage (e) {
                this.isHovered = false;

                // change value property before clear for trigger the reactivity
                this.value = '';

                let filesSrcArray = null;

                if (e.dataTransfer) {
                    // drop upload
                    filesSrcArray = e.dataTransfer.files;
                }
                else {
                    // input upload
                    filesSrcArray = e.target.files;
                }

                // if not multiple then select only first file
                if (!this.multiple) {
                    filesSrcArray = [filesSrcArray[0]];
                }

                filesSrcArray.forEach(this.imageReader);

                // clear the input[type="file"] value for load the same file few times
                this.clearInput();
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