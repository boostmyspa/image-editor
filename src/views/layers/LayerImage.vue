<template>
    <div>
        <div v-if="isCatalog">
            <label>
                Set label
                <input type="text" v-model="item.label">
            </label>
            <br>
        </div>
        <div v-else>
            <upload-image @uploadedImage="setCurrentImage"></upload-image>
        </div>

        <catalog-thumbnail v-if="item.catalog"
                           :catalog="item.catalog"
                           :catalogThumbnailIndex="item.catalogThumbnailIndex"
                           @setCurrentImage="setCurrentImage"
        ></catalog-thumbnail>
        <div v-else-if="item.src" class="current-image-box">
            <img class="current-image" :src="item.src" alt="">
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
    import { /*mapState,*/ mapActions } from 'vuex';
    import UploadImage from '../uploader/UploadImage';
    import ImageInputSettings from './LayerImageSettings';
    import CatalogThumbnail from './CatalogThumbnail';

    export default {
        name: "ImageInput",
        components: {
            'upload-image': UploadImage,
            'image-input-settings': ImageInputSettings,
            'catalog-thumbnail': CatalogThumbnail,
        },

        props: [
           'item'
        ],

        data: () => {
            return {
                openGallery: false,
                showSettings: false,
            }
        },

        methods: {
            ...mapActions([
                'setSelectedLayerId',
            ]),

            ...mapActions('imageBox', [
                'remove',
                'changeImage',
                'changeSettings',
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

            restoreCatalog () {
                // let isGalleryPublic = this.item.fromPublicGallery;

                // next here need find the Catalog by its id in the Public/Private Gallery;
                // the same should be done for the Static and Background data

                // !!!!!! or Catalog will be loaded from the Server and will not changed.
            },

        },

        computed: {
            isCatalog () {
                return this.item.type == 'imageCatalog';
            },
        },

        mounted () {
            if (this.item.catalogId) {
                // when data load from server
                // restore a link to the Catalog by its id
                this.restoreCatalog();
            }
        }
    }
</script>

<style scoped>
    .current-image-box {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 5px 0 0;
    }

    .current-image {
        display: block;
        max-width: 100px;
        margin: 5px 0;
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