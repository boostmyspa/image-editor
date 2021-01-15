<template>
    <upload-image
            :dragUploadEnable="dragUploadEnable"
            :label="label"
            :multiple="multiple"
            @uploadedImage="uploadedImage"
    >
        <slot></slot>
    </upload-image>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import UploadImage from './UploadImage';

    export default {
        name: "UploadImageToCanvas",
        components: {
            'upload-image': UploadImage,
        },

        props: {
            label: {
                type: String
            },
            multiple: {
                type: Boolean,
                default: false
            },
            dragUploadEnable: {
                type: Boolean,
                default: false
            },
            specifiedGalleryRootId: {
                type: String,
                // required: true
            }
        },

        methods: {
            ...mapActions('gallery', [
                'setDraggedImage',
                'setDraggedCatalog',
            ]),

            ...mapActions('bgImage', {
                setBackgroundImage: 'setUploadedImage',
            }),

            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),


            setImageAsBackground (image) {
                this.setBackgroundImage(image);
            },

            setImageAsStatic (image) {
                let item = {
                    type: 'imageStatic',
                    image,
                    src: image.src
                };

                this.addImageBox(item);
            },

            setImageAsCatalog (image) {
                let item = {
                    type: 'imageCatalog',
                    image,
                    src: image.src
                };

                if (this.catalogDraggedFromGallery) {
                    const catalog = this.catalogDraggedFromGallery;

                    item.catalog = catalog;
                    item.catalogId = catalog.id;
                    item.fromPublicGallery = this.draggedItemGalleryRoot.isPublic;
                }

                this.addImageBox(item);
            },


            uploadedImage (image) {
                // if image/catalog was dragged from Gallery, it have specified "GalleryRoot.rootId"
                const draggedItemGalleryRoot = this.draggedItemGalleryRoot && this.draggedItemGalleryRoot.rootId;

                if (this.imageDraggedFromGallery || this.catalogDraggedFromGallery) {
                    this.specifiedGalleryUploadedImage(image, draggedItemGalleryRoot);
                }
                else {
                    // image was dragged not from Gallery
                    if (this.specifiedGalleryRootId) {
                        // and dropped to the Component with the defined "specifiedGalleryRootId"
                        this.specifiedGalleryUploadedImage(image, this.specifiedGalleryRootId);
                    }
                    else {
                        // image was dragged to the common Canvas Component
                        // and will be set as "Background" if it has no Background
                        // or as "Static" in other cases
                        // In this case it can't be a "Catalog"
                        if (!this.backgroundImage) {
                            // set the Background Image
                            this.setImageAsBackground(image);
                        }
                        else {
                            // add the Image Box "Static" Layer
                            this.setImageAsStatic(image);
                        }
                    }
                }

                // reset the dragged items
                this.setDraggedImage({ image: null, galleryRoot: null });
                this.setDraggedCatalog({ catalog: null, galleryRoot: null });
            },

            specifiedGalleryUploadedImage (image, galleryRootId) {
                switch (galleryRootId) {
                    case 'Backgrounds':
                        this.setImageAsBackground(image);
                        break;

                    case 'Statics':
                        this.setImageAsStatic(image);
                        break;

                    case 'Catalogs':
                        this.setImageAsCatalog(image);
                        break;

                    default:
                        break;
                }
            },

        },

        computed: {
            ...mapState('bgImage', {
                backgroundImage: 'image'
            }),

            ...mapState('gallery', {
                imageDraggedFromGallery: 'draggedImage',
                catalogDraggedFromGallery: 'draggedCatalog',
                draggedItemGalleryRoot: 'draggedItemGalleryRoot',
            }),
        }
    }
</script>

<style scoped>

</style>