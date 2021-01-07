<template>
    <div class="gallery-image-item">
        <img class="gallery-img"
             :src="image.src"
             :title="image.title"
             @click="selectImage"
        >
        <button class="remove-image" @click.left="remove">X</button>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';

    export default {
        name: "GalleryImageItem",
        props: [
            'image',
            'group'
        ],

        methods: {
            ...mapActions('gallery', [
                'removeImageFromGroup'
            ]),

            remove () {
                this.removeImageFromGroup({ group: this.group, imageItem: this.image })
            },

            selectImage () {

            }
        }
    }
</script>

<style scoped>
    .gallery-image-item {
        position: relative;
        flex: 0 1 auto;
        width: calc(50% - 2px);
        margin: 0 0 4px;
    }

    .gallery-img {
        width: 100%;
        /*cursor: pointer;*/
    }

    .remove-image {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
</style>