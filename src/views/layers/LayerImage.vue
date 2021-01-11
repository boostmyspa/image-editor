<template>
    <div>
        <div v-if="item.catalogId">
            <label>
                Set label
                <input type="text" v-model="item.label">
            </label>
            <br>
        </div>
        <div v-else>
            <upload-image @uploadedImage="setCurrentImage"></upload-image>
        </div>

        <img v-if="item.src" class="current-image" :src="item.src" alt="">

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
    import ImageInputSettings from './LayerImageSettings'

    export default {
        name: "ImageInput",
        components: {
            'upload-image': UploadImage,
            'image-input-settings': ImageInputSettings,
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
                'setSelectedLayerId',
            ]),

            ...mapActions('imageBox', [
                'remove',
                'changeImage',
                'changeSettings'
            ]),

            removeItem () {
                this.setSelectedLayerId(null);
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

        },

        mounted () {
            console.log(this.item);
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