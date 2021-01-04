<template>
    <div class="gallery">
        <img class="gallery-img" v-for="img in gallery"
             :src="img.src"
             :title="img.title"
             :key="img.src"
             @click="selectImage(img)"
        >
    </div>
</template>

<script>
    export default {
        name: "ImageGallery",
        props: [
            'gallery'
        ],
        methods: {
            selectImage (img) {
                let imageObj = new Image();

                imageObj.onload = (e) => {
                    let image = e.path[0];
                    this.$emit('selectImage', image);
                };

                imageObj.src = img.src;
            },


        }
    }
</script>

<style scoped>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .gallery-img {
        flex: 0 1 auto;
        width: calc(50% - 2px);
        margin: 0 0 4px;
        cursor: pointer;
    }
</style>