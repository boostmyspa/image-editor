<template>
    <div>
        <br>
        <upload-image @uploadedImage="setCurrentImage"></upload-image>
        |
        <button @click="openGallery = !openGallery">Select from Gallery</button>

        <img v-if="item.src" class="current-image" :src="item.src" alt="">

        <image-gallery v-show="openGallery" :gallery="imageGallery" @selectImage="setImageFromGallery"></image-gallery>

        <div class="buttons">
            <button @click="showSettings = !showSettings">Settings</button>
            | <button @click="removeItem">Remove</button>
        </div>
        <div class="clearfix"></div>

        <image-input-settings v-if="showSettings" :settings="item.settings" @settingsChanged="settingsChanged"></image-input-settings>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import UploadImage from '../uploader/UploadImage';
    import ImageInputSettings from './ImageLayerSettings'
    import ImageGallery from '../gallery/ImageGallery';

    export default {
        name: "ImageInput",
        components: {
            'upload-image': UploadImage,
            'image-input-settings': ImageInputSettings,
            'image-gallery': ImageGallery
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

            setCurrentImage (image) {
                this.changeImage({ item: this.item, image, src: image.src });
            },

            setImageFromGallery (image) {
                this.changeImage({ item: this.item, image, src: image.src });
            },

        },

        computed: {
            ...mapState('imageGallery', {
                imageGallery: 'images'
            }),
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

    [type="file"] {
        max-width: 100%;
    }
</style>