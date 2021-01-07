<template>
    <div class="gallery-catalog">
        <p>
            <b @click="open = !open">{{ catalog.title }}</b>
            <button class="remove-catalog" @click.left="remove">Remove</button>
            | <upload-image :label="'Add Images'" @uploadedImage="addImages"></upload-image>
        </p>

        <div v-if="catalog.items.length" class="gallery-catalog-items">
            <gallery-catalog-item v-for="image in catalog.items" :image="image" :catalog="catalog" :key="image.id"></gallery-catalog-item>
        </div>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';
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
            'group'
        ],

        data: () => {
           return {
               open: false
           }
        },

        methods: {
            ...mapActions('gallery', [
                'removeCatalog',
                'addImageToCatalog'
            ]),

            remove () {
                this.removeCatalog({ parentGroup: this.group, catalogRemoving: this.catalog });
            },

            addImages (image) {
                let src = image.src;
                this.addImageToCatalog({ catalog: this.catalog, src });
            }
        }
    }
</script>

<style scoped>

</style>