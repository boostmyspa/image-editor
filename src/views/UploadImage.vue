<template>
    <label>
        <input @change="handleImage" type="file" name="imageLoader" accept="image/*">
    </label>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "uploadImage",

        data: () => {
            return {
                // imageFile: null
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
                let
                    imageObj = new Image(),
                    reader = new FileReader();

                reader.onload = (event) => {
                    this.imageLoaded(imageObj, event.target.result);
                };

                reader.readAsDataURL(e.target.files[0]);
            }
        }
    }
</script>

<style scoped>
    [type="file"] {
        max-width: 100%;
    }
</style>