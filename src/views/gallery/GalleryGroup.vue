<template>
    <div class="gallery-group" :class="!group.isRoot ? 'nested' : ''">
        <p>
            <b @click="open = !open">{{ group.title }}</b>

            <span v-if="!isPublicGroup">
                <button v-if="!group.isRoot" @click.left="remove">Remove</button>
                | <button @click.left="addGroup">Add Group</button>
                | <upload-image v-if="group.items" :label="'Add Image'" :multiple="true" @uploadedImage="addImage"></upload-image>
                | <button v-if="group.catalogs" @click.left="addCatalog">Add Catalog</button>
            </span>
        </p>

        <div v-show="open" class="gallery-items">
            <template v-if="galleryPublic" note="this group only exists at the root level">
                <gallery-group v-for="nestedGroup in rootPublicGroup.groups"
                               :parent="group"
                               :group="nestedGroup"
                               :isPublicGroup="true"
                               :galleryRoot="group"
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
            'galleryPublic',
            'group',
            'parent',
            'galleryRoot',
            'isPublicGroup',
        ],

        data: () => {
            return {
                open: false,
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
            },

            addImage (image) {
                let src = image.src;

                this.addImageToGroup({ group: this.group, src });
            },

            addCatalog() {
                this.addNewCatalog({ parentGroup: this.group });
            },

        },

        computed: {
            rootPublicGroup () {
                // uses only for the "galleryPublic"
                let rootId = this.group.rootId;
                let publicGroup = this.galleryPublic.find( (item) => item.rootId == rootId);

                return publicGroup;
            },

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