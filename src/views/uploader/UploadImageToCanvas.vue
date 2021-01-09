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
                'setDraggedImage'
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

                if (this.imageDraggedFromGallery) {
                    // bound only the catalogId. If needed, I will add link to catalog
                    item.catalogId = this.imageDraggedFromGallery.catalog.id;
                }

                this.addImageBox(item);
            },


            uploadedImage (image) {
                if (this.imageDraggedFromGallery) {
                    // image was dragged from Gallery
                    // with specified "GalleryRoot.rootId"
                    const galleryRootId = this.draggedImageGalleryRoot && this.draggedImageGalleryRoot.rootId;

                    this.specifiedGalleryUploadedImage(image, galleryRootId);
                }
                else {

                    // image was dragged not from Gallery
                    if (this.specifiedGalleryRootId) {
                        // and dropped to this Component with the defined "specifiedGalleryRootId"
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

                this.setDraggedImage({ image: null, galleryRoot: null });
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
                backgroundImage: 'uploadedImage'
            }),

            ...mapState('gallery', {
                imageDraggedFromGallery: 'draggedImage',
                draggedImageGalleryRoot: 'draggedImageGalleryRoot'
            }),
        }
    }
</script>

<style scoped>

</style>