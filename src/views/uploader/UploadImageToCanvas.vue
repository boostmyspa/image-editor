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
            specifiedGallery: {
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
                    image,
                    src: image.src
                };

                this.addImageBox(item);
            },

            setImageAsCatalog (image) {
                console.log(image);
            },


            uploadedImage (image) {
                if (this.imageDraggedFromGallery) {
                    // image was dragged from Gallery
                    // with specified "RootGallery" (contain title)
                    const rootGalleryTitle = this.draggedImageRootGallery && this.draggedImageRootGallery.title;

                    this.specifiedGalleryUploadedImage(image, rootGalleryTitle);
                }
                else {

                    // image was dragged not from Gallery
                    if (this.specifiedGallery) {
                        // and dropped to this Component with the defined "specifiedGallery" name
                        this.specifiedGalleryUploadedImage(image, this.specifiedGallery);
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

                this.setDraggedImage({ image: null, rootGallery: null });
            },

            specifiedGalleryUploadedImage (image, rootGalleryTitle) {
                switch (rootGalleryTitle) {
                    case 'Backgrounds':
                        this.setImageAsBackground(image);
                        break;

                    case 'Static':
                        this.setImageAsStatic(image);
                        break;

                    case 'Catalog':
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
                draggedImageRootGallery: 'draggedImageRootGallery'
            }),
        }
    }
</script>

<style scoped>

</style>