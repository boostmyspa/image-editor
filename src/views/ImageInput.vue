<template>
    <div>
        <br>
        <label>
            <input @change="handleImage" type="file" name="imageLoader" accept="image/*">
        </label>
        |
        <button @click="openGallery = !openGallery">Select from Gallery</button>

        <img v-if="item.src" class="current-image" :src="item.src" alt="">

        <div class="gallery" v-if="openGallery">
            Gallery
        </div>

        <div class="buttons">
            <button @click="showSettings = !showSettings">Settings</button>
            | <button @click="removeItem">Remove</button>
        </div>
        <div class="clearfix"></div>

        <image-input-settings v-if="showSettings" :settings="item.settings" @settingsChanged="settingsChanged"></image-input-settings>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import ImageInputSettings from './ImageInputSettings'

    export default {
        name: "ImageInput",
        components: {
            'image-input-settings': ImageInputSettings
        },

        props: [
           'item'
        ],

        data: () => {
            return {
                openGallery: false,
                showSettings: false
            }
        },

        methods: {
            ...mapActions([
                'changeSelectedElementId',
            ]),

            ...mapActions('imageBox', [
                'remove',
                'changeImage',
                'changeSettings'
            ]),

            removeItem () {
                this.changeSelectedElementId(null);
                this.remove(this.item.id);
            },

            settingsChanged (newSettings) {
                this.changeSettings({ item: this.item, settings: newSettings });
            },

            imageLoaded (imageObj, imageSrc) {
                imageObj.onload = (e) => {
                    let image = e.path[0];

                    this.setCurrentImage(image);
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
            },

            setCurrentImage (image) {
                this.changeImage({ item: this.item, image, src: image.src });

                // this.addImageToGallery(image);
            },

            addImageToGallery (/*image*/) {
                // console.log(image);
            }
        }
    }
</script>

<style scoped>
    .current-image {
        display: block;
        max-width: 100px;
        margin: 5px auto;
    }

    .buttons {
        float: right;
        margin: 5px 0 0;
    }

    .clearfix {
        clear: both;
    }
</style>