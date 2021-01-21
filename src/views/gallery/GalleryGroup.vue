<template>
    <div class="gallery-group" v-show="activeGroup == group.rootId" :class="group.isRoot ? 'root' : ''">
        <div class="gallery-group-header" @click.self="open = !open" :class="open ? 'open' : ''">

            <div @click.self="toggleGroup" class="gallery-group--title" :title="group.title">
                <i @click.self="toggleGroup" class="open-icon icon-right-open-mini"></i>

                <input v-if="titleRename"
                       ref="groupTitleInput"
                       class="gallery-group--title-input"
                       type="text"
                       v-model.trim="group.title"
                       @blur="titleRenameDone"
                       @keydown.enter="titleRenameDone"
                >
                <b v-else @click.left="toggleGroup" class="gallery-group--title-text">{{ group.title }}</b>
            </div>

            <div v-if="!isPublicGroup" class="gallery-group--buttons">
                <button @click.left="addGroup" class="btn-icon-wrap">
                    <i class="icon-folder-add"></i>
                </button>

                <button v-if="group.catalogs" @click.left="addCatalog" class="btn-icon-wrap">
                    <i class="icon-image-add"></i>
                </button>
                <upload-image v-if="group.items" :class="'btn-icon-wrap'" :multiple="true" @uploadedImage="addImage">
                    <i class="icon-image-add"></i>
                </upload-image>


                <div v-if="!group.isRoot" class="gallery-group--settings">
                    <i class="icon-dot-3"></i>
                    <div class="gallery-group--settings-list">
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

        <div v-show="open" class="gallery-items" :class="!group.isRoot ? 'nested' : ''">
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

            <div v-if="group.items && group.items.length" class="gallery-images">
                <gallery-image-item v-for="image in group.items"
                                    :image="image"
                                    :group="group"
                                    :inPublicGroup="groupIsPublic"
                                    :galleryRoot="currentGalleryRoot"
                                    :key="image.id"
                ></gallery-image-item>
            </div>
            <div v-if="group.catalogs && group.catalogs.length" class="gallery-catalogs">
                <gallery-image-catalog v-for="catalog in group.catalogs"
                                       :catalog="catalog"
                                       :group="group"
                                       :inPublicGroup="groupIsPublic"
                                       :galleryRoot="currentGalleryRoot"
                                       :key="catalog.id"
                ></gallery-image-catalog>
            </div>

            <div v-if="groupIsEmpty" class="text-muted mt-1 mb-1">Group is empty</div>
        </div>
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
            'activeGroup',
            'publicGroup',
            'group',
            'parent',
            'galleryRoot',
            'isPublicGroup',
        ],

        data: () => {
            return {
                open: false,
                titleRename: false,
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

            toggleGroup () {
                this.open = !this.open;
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

            groupIsEmpty () {
                if (this.group.isRoot)
                    return false;

                let groups = this.group.groups && this.group.groups.length;
                let items = this.group.items && this.group.items.length;
                let catalogs = this.group.catalogs && this.group.catalogs.length;

                return !(groups || items || catalogs);
            },
        },

        watch: {
           titleRename () {
               if (this.titleRename) {
                   let t = setTimeout(() => {
                       clearTimeout(t);
                       this.$refs.groupTitleInput.focus();
                   });

               }
           }
        },

        mounted () {
            if (this.group.isRoot) {
                this.open = true;
            }
        }
    }
</script>

<style scoped>

</style>