<template>
    <div class="gallery-image-item" >
        <img class="gallery-img" draggable="true"
             :src="image.src"
             :title="image.title"
             @dragstart="dragStart"
             @dragend="dragEnd"
        >
        <button v-if="!inPublicGroup" class="btn-remove btn-icon-wrap" @click.left="remove">
            <i class="icon-delete-filled"></i>
        </button>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';

    export default {
        name: "GalleryImageItem",
        props: [
            'image',
            'group',
            'galleryRoot',
            'inPublicGroup',
        ],

        data: () => {
           return {

           }
        },

        methods: {
            ...mapActions('gallery', [
                'removeImageFromGroup',
                'setDraggedImage'
            ]),

            remove () {
                this.removeImageFromGroup({ group: this.group, imageItem: this.image });
            },

            dragStart () {
                this.setDraggedImage({ image: this.image, galleryRoot: this.galleryRoot });
            },

            dragEnd () {
                console.log('dragEnd');

                // this.setDraggedImage({ image: null, galleryRoot: null });
            },

        },

        mounted () {

        },
    }
</script>

<style scoped>

</style>