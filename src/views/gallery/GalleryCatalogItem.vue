<template>
    <div class="gallery-catalog-item">
        <input class="gallery-catalog-item-title" type="text" v-model="image.title">
        <img class="gallery-catalog-img" draggable="false"
             :src="image.src"
             :title="image.title"
        >
        <button class="remove-catalog-item" @click.left="remove">X</button>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';

    export default {
        name: "GalleryImageItem",
        props: [
            'image',
            'catalog'
        ],

        methods: {
            ...mapActions('gallery', [
                'removeImageFromGroup'
            ]),

            remove () {
                this.removeImageFromGroup({ group: this.catalog, imageItem: this.image })
            },


        },


    }
</script>

<style scoped>
    .gallery-catalog-item {
        position: relative;
        margin: 0 0 4px;
        padding: 0 0 4px;
        border-bottom: 1px solid;
    }

    .gallery-catalog-item-title {
        margin: 0 0 4px;
    }

    .gallery-catalog-img {
        max-width: 100%;
        /*cursor: pointer;*/
    }

    .remove-catalog-item {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
</style>