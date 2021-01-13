<template>
    <div class="current-image-box">
        <button @click.left="setThumbnailPrevious">&#8592; Prev</button>
        <img class="current-image" :src="thumbnailSrc" alt="">
        <button @click.left="setThumbnailNext">Next &#8594;</button>
    </div>
</template>

<script>
    export default {
        name: "CatalogThumbnail",

        props: [
            'catalog',
        ],

        data: () => {
            return {
                currentThumbnailIndex: 0,
            }
        },

        methods: {
            setThumbnailPrevious () {
                if (this.currentThumbnailIndex <= 0) {
                    this.currentThumbnailIndex = this.catalogItemsLength - 1;
                }
                else {
                    this.currentThumbnailIndex--;
                }
            },

            setThumbnailNext () {
                if (this.currentThumbnailIndex >= this.catalogItemsLength - 1) {
                    this.currentThumbnailIndex = 0;
                }
                else {
                    this.currentThumbnailIndex++;
                }
            },

            setThumbnailAsCurrentImage () {
                let imageObj = new Image();

                imageObj.onload = (e) => {
                    let image = e.path[0];

                    this.$emit('setCurrentImage', image);
                };

                imageObj.src = this.thumbnailSrc;
            },
        },

        computed: {
            catalogItemsLength () {
                return this.catalog.items.length;
            },

            thumbnailSrc () {
                let thumbnail = this.catalog.items[this.currentThumbnailIndex];

                if (!thumbnail) return null;

                return thumbnail.src;
            },
        },

        watch: {
            thumbnailSrc () {
                this.setThumbnailAsCurrentImage();
            }
        },
    }
</script>

<style scoped>
    .current-image-box {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 5px 0 0;
    }

    .current-image {
        display: block;
        max-width: 100px;
        margin: 5px 0;
    }
</style>