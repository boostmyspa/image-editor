<template>
    <div class="layer layer-image" @click="selectLayer">
        <i class="layer-type-icon icon-image"></i>

        <catalog-thumbnail v-if="item.catalog"
                           :catalog="item.catalog"
                           :catalogThumbnailIndex="item.catalogThumbnailIndex"
                           @setCurrentImage="setCurrentImage"
        ></catalog-thumbnail>
        <div v-else-if="item.src" class="current-image-box">
            <img class="current-image-box--thumbnail" :src="item.src" alt="">
        </div>

        <div v-if="isCatalog">
            <input type="text" v-model="item.label" placeholder="Set label">
        </div>
        <div v-else>
            <upload-image @uploadedImage="setCurrentImage" class="btn-icon-wrap">
                <i class="icon-image-update"></i>
            </upload-image>
        </div>

        <button @click.left="removeItem" class="btn-icon-wrap">
            <i class="icon-delete-filled"></i>
        </button>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';
    import UploadImage from '../uploader/UploadImage';
    import CatalogThumbnail from './CatalogThumbnail';

    export default {
        name: "ImageInput",
        components: {
            'upload-image': UploadImage,
            'catalog-thumbnail': CatalogThumbnail,
        },

        props: [
           'item'
        ],

        data: () => {
            return {
                openGallery: false,
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'setSelectedLayer',
                'changeImage',
                'changeAlign',
            ]),

            ...mapActions('imageBox', [
                'remove',
            ]),

            removeItem () {
                this.setSelectedLayer(null);
                this.remove(this.item.id);
            },

            setCurrentImage (image) {
                this.changeImage(image);
            },

            restoreCatalog () {
                // let isGalleryPublic = this.item.fromPublicGallery;

                // next here need find the Catalog by its id in the Public/Private Gallery;
                // the same should be done for the Static and Background data

                // !!!!!! or Catalog will be loaded from the Server and will not changed.
            },

            selectLayer () {
                this.$emit('selectLayer', this.item);
            }

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

</style>