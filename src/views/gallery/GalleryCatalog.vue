<template>
    <div class="gallery-catalog">
        <p>
            <b @click="open = !open">{{ catalog.title }}</b>

            <span v-if="!inPublicGroup">
                <button class="remove-catalog" @click.left="remove">Remove</button>
                | <upload-image :label="'Add Images'" :multiple="true" @uploadedImage="addImages"></upload-image>
                <br>
            </span>

            <img v-if="catalog.items.length"
                 class="gallery-catalog-thumbnail"
                 :src="catalogThumbnail.src"
                 @dragstart="startDrag"
            >
        </p>

        <div v-show="open" v-if="catalog.items.length" class="gallery-catalog-items">
            <gallery-catalog-item v-for="image in catalog.items"
                                  :image="image"
                                  :catalog="catalog"
                                  :inPublicGroup="inPublicGroup"
                                  :key="image.id"
            ></gallery-catalog-item>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import GalleryCatalogItem from './GalleryCatalogItem';
    import UploadImage from '../uploader/UploadImage';

    export default {
        name: "GalleryImageCatalog",
        components: {
            'gallery-catalog-item': GalleryCatalogItem,
            'upload-image': UploadImage,
        },

        props: [
            'catalog',
            'group',
            'galleryRoot',
            'inPublicGroup',
        ],

        data: () => {
           return {
               open: false,
           }
        },

        methods: {
            ...mapActions('gallery', [
                'removeCatalog',
                'addImageToCatalog',
                'setDraggedImage'
            ]),

            remove () {
                this.removeCatalog({ parentGroup: this.group, catalogRemoving: this.catalog });
            },

            addImages (image) {
                let src = image.src;
                this.addImageToCatalog({ catalog: this.catalog, src: src });
            },

            startDrag () {
                this.setDraggedImage({ image: this.catalogThumbnail, galleryRoot: this.galleryRoot });
            },
        },

        computed: {
            ...mapState('gallery', [
                'gallery'
            ]),

            catalogThumbnail () {
                let thumbnail = this.catalog.items[0];
                thumbnail.catalog = this.catalog;

                return thumbnail;
            }
        },

        mounted () {

        }
    }
</script>

<style scoped>
    .gallery-catalog-thumbnail {
        max-width: 100px;
        margin: 5px auto;
    }
</style>