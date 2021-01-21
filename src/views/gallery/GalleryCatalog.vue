<template>
    <div class="gallery-catalog">
        <div class="gallery-catalog-header" @click.self="open = !open" :class="open ? 'open' : ''">
            <div @click.self="toggleCatalog" class="gallery-catalog--title" :title="catalog.title">
                <i @click.self="toggleCatalog" class="open-icon icon-right-open-mini"></i>

                <img v-if="catalog.items.length"
                     class="gallery-catalog-thumbnail"
                     :src="catalogThumbnail.src"
                     @dragstart="startDrag"
                     @dragend="dragEnd"
                >
                <i v-else @click.self="toggleCatalog" class="gallery-catalog-thumbnail-icon icon-content"></i>

                <input v-if="titleRename"
                       ref="catalogTitleInput"
                       class="gallery-catalog--title-input"
                       type="text"
                       v-model.trim="catalog.title"
                       @blur="titleRenameDone"
                       @keydown.enter="titleRenameDone"
                >
                <b v-else @click.left="toggleCatalog" class="gallery-group--title-text">{{ catalog.title }}</b>
            </div>

            <div v-if="!inPublicGroup" class="gallery-catalog--buttons">
                <upload-image :class="'btn-icon-wrap'" :multiple="true" @uploadedImage="addImages">
                    <i class="icon-image-add"></i>
                </upload-image>

                <div class="gallery-catalog--settings">
                    <i class="icon-dot-3"></i>
                    <div class="gallery-catalog--settings-list">
                        <button @click.left="titleRename = !titleRename" class="btn-icon-wrap">
                            <i class="icon-edit"></i>
                        </button>
                        <button @click.left="remove" class="btn-icon-wrap">
                            <i class="icon-delete-filled"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="open" class="gallery-catalog-items">
            <gallery-catalog-item v-for="image in catalog.items"
                                  :image="image"
                                  :catalog="catalog"
                                  :inPublicGroup="inPublicGroup"
                                  :key="image.id"
            ></gallery-catalog-item>

            <div v-if="!catalog.items.length" class="text-muted mt-1 mb-1 pl-4">Catalog is empty</div>
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
               titleRename: false,
           }
        },

        methods: {
            ...mapActions('gallery', [
                'removeCatalog',
                'addImageToCatalog',
                'setDraggedCatalog'
            ]),

            remove () {
                this.removeCatalog({ parentGroup: this.group, catalogRemoving: this.catalog });
            },

            addImages (image) {
                let src = image.src;
                this.addImageToCatalog({ catalog: this.catalog, src: src });
                this.openCatalog();
            },

            startDrag () {
                this.setDraggedCatalog({ catalog: this.catalog, galleryRoot: this.galleryRoot });
            },

            dragEnd () {
                console.log('dragEnd');

                // this.setDraggedCatalog({ catalog: null, galleryRoot: null });
            },

            openCatalog () {
                this.open = true;
            },

            toggleCatalog () {
                this.open = !this.open;
            },

            titleRenameDone () {
                this.titleRename = false;
            },
        },

        computed: {
            ...mapState('gallery', [
                'gallery'
            ]),

            catalogThumbnail () {
                return this.catalog.items[0];
            },

        },

        watch: {
            titleRename () {
                if (this.titleRename) {
                    let t = setTimeout(() => {
                        clearTimeout(t);
                        this.$refs.catalogTitleInput.focus();
                    });

                }
            }
        },

        mounted () {

        }
    }
</script>

<style scoped>

</style>