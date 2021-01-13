<template>
    <div class="gallery-group" :class="!group.isRoot ? 'nested' : ''">
        <p>
            <input v-if="titleRename"
                   type="text"
                   v-model.trim="group.title"
                   @blur="titleRenameDone"
                   @keydown.enter="titleRenameDone"
            >
            <b v-else @click="open = !open">{{ group.title }}</b>

            <span v-if="!isPublicGroup">
                <span v-if="!group.isRoot">
                    <button @click.left="titleRename = !titleRename">Rename</button>
                    | <button @click.left="remove">Remove</button>
                    |
                </span>
                <button @click.left="addGroup">Add Group</button>
                | <upload-image v-if="group.items" :label="'Add Image'" :multiple="true" @uploadedImage="addImage"></upload-image>
                | <button v-if="group.catalogs" @click.left="addCatalog">Add Catalog</button>
            </span>
        </p>

        <div v-show="open" class="gallery-items">
            <template v-if="publicGroup" note="this group only exists at the root level">
                <gallery-group v-for="nestedGroup in publicGroup.groups"
                               :parent="group"
                               :group="nestedGroup"
                               :isPublicGroup="true"
                               :galleryRoot="publicGroup"
                               :key="'public-' + nestedGroup.id"
                ></gallery-group>
            </template>

            <gallery-group v-for="nestedGroup in group.groups"
                           :parent="group"
                           :group="nestedGroup"
                           :isPublicGroup="groupIsPublic"
                           :galleryRoot="currentGalleryRoot"
                           :key="nestedGroup.id"
            ></gallery-group>

            <div v-if="group.items" class="gallery-images">
                <gallery-image-item v-for="image in group.items"
                                    :image="image"
                                    :group="group"
                                    :inPublicGroup="groupIsPublic"
                                    :galleryRoot="currentGalleryRoot"
                                    :key="image.id"
                ></gallery-image-item>
            </div>
            <div v-if="group.catalogs" class="gallery-catalogs">
                <gallery-image-catalog v-for="catalog in group.catalogs"
                                       :catalog="catalog"
                                       :group="group"
                                       :inPublicGroup="groupIsPublic"
                                       :galleryRoot="currentGalleryRoot"
                                       :key="catalog.id"
                ></gallery-image-catalog>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';
    import GalleryImageItem from './GalleryImageItem';
    import GalleryImageCatalog from './GalleryCatalog';
    import UploadImage from '../uploader/UploadImage';

    export default {
        name: "GalleryGroup",
        components: {
            'gallery-image-item': GalleryImageItem,
            'gallery-image-catalog': GalleryImageCatalog,
            'upload-image': UploadImage,
        },

        props: [
            'publicGroup',
            'group',
            'parent',
            'galleryRoot',
            'isPublicGroup',
        ],

        data: () => {
            return {
                open: false,
                titleRename: false
            }
        },

        methods: {
            ...mapActions('gallery', [
                'addImageToGroup',
                'addNewGroup',
                'removeGroup',
                'addNewCatalog'
            ]),

            remove () {
                this.removeGroup({ parentGroup: this.parent, groupRemoving: this.group });
            },

            addGroup () {
                this.addNewGroup({ parentGroup: this.group });
                this.openGroup();
            },

            addImage (image) {
                let src = image.src;

                this.addImageToGroup({ group: this.group, src });
                this.openGroup();
            },

            addCatalog () {
                this.addNewCatalog({ parentGroup: this.group });
                this.openGroup();
            },

            openGroup () {
                this.open = true;
            },

            titleRenameDone () {
               this.titleRename = false;
            },

        },

        computed: {
            groupIsPublic () {
                return this.group.isRoot ? false : this.isPublicGroup;
            },

            currentGalleryRoot () {
                return this.group.isRoot ? this.group : this.galleryRoot;
            },
        },

        mounted () {

        }
    }
</script>

<style scoped>
    .gallery-group.nested {
        padding-left: 20px;
    }

    .gallery-images {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>